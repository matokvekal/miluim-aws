import express, { Express, Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from "express-rate-limit";

import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } from "../constants/index";

import initAuthRoutes from "./initRoutes";
import initTempRoutes from "./initRoutes";
import { initSNP500Routes } from "./initRoutes";
import initDatabase from "./initDatabase";

interface Config {
  [key: string]: any;
}

export default async (config: Config) => {

  const app: Express = express();
  const server = http.createServer(app);

  // ✅ CORS before everything else
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || origin.startsWith("http://localhost") || origin.startsWith("https://localhost") || origin.startsWith("http://10.14.")) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],//crud
      allowedHeaders: ['Content-Type', 'Authorization', 'x-warehouse'],
    })
  );
  app.options("*", cors());

  // ✅ Security and parsing
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // ✅ Logging
  // app.use(loggerMiddleware({ toConsole: true, toFile: true }));

  // ✅ Rate limiting
  const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Initialize Database
  const dbModels = await initDatabase(config);

  // Store dbModels in app for controllers to access
  app.set("dbModels", dbModels);

  const tempRouter = express.Router();
  initTempRoutes(tempRouter, app);
  app.use("/api/temp", tempRouter);

  const snp500Router = express.Router();
  initSNP500Routes(snp500Router, app);
  app.use("/api/snp500", snp500Router);
  return { app, server, dbModels };
};
