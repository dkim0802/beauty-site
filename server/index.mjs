import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const PORT = Number(process.env.PORT || 3001);
const DEFAULT_CORS_ORIGINS = [
    "http://localhost:5173",
    "https://beauty-site-six.vercel.app",
];

const tableQueries = {
    "table-beauty-site":
        'SELECT id, image, title, price FROM "table-beauty-site" ORDER BY id',
    "table-boxes":
        'SELECT id, image, title, price FROM "table-boxes" ORDER BY id',
};

const corsOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins =
    corsOrigins.length > 0 ? corsOrigins : DEFAULT_CORS_ORIGINS;

const getDatabaseUrl = () => {
    const isRailwayRuntime =
        Boolean(process.env.RAILWAY_ENVIRONMENT) ||
        Boolean(process.env.RAILWAY_ENVIRONMENT_NAME) ||
        Boolean(process.env.RAILWAY_PROJECT_ID);

    const databaseUrl = isRailwayRuntime
        ? process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL
        : process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL or DATABASE_PUBLIC_URL is not configured.");
    }

    return databaseUrl;
};

const pool = new Pool({
    connectionString: getDatabaseUrl(),
    max: 5,
    ssl: {
        rejectUnauthorized: false,
    },
});

const app = express();

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Origin is not allowed by CORS."));
        },
    }),
);

const toNumber = (value, fieldName) => {
    const parsedValue = typeof value === "number" ? value : Number(value);

    if (!Number.isFinite(parsedValue)) {
        throw new Error(`Database field ${fieldName} must be a finite number.`);
    }

    return parsedValue;
};

const toCatalogItem = (row) => {
    if (typeof row.image !== "string" || typeof row.title !== "string") {
        throw new Error("Database row has invalid image or title field.");
    }

    return {
        id: toNumber(row.id, "id"),
        image: row.image,
        title: row.title,
        price: toNumber(row.price, "price"),
    };
};

const fetchCatalogItems = async (tableName) => {
    const query = tableQueries[tableName];

    if (!query) {
        throw new Error(`Unknown catalog table: ${tableName}`);
    }

    const result = await pool.query(query);
    return result.rows.map(toCatalogItem);
};

const createCatalogHandler = (tableName) => async (_req, res) => {
    try {
        res.json(await fetchCatalogItems(tableName));
    } catch {
        res.status(500).json({ error: "Failed to load catalog data." });
    }
};

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/table-beauty-site", createCatalogHandler("table-beauty-site"));
app.get("/table-boxes", createCatalogHandler("table-boxes"));

app.listen(PORT, () => {
    console.log(`Railway catalog API is listening on port ${PORT}`);
});
