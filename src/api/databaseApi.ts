import axios from "axios";

export interface ProductItem {
    id: number;
    image: string;
    title: string;
    price: number;
}

export type BoxItem = ProductItem;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";
const productsEndpoint =
    import.meta.env.VITE_PRODUCTS_ENDPOINT?.trim() || "/table-beauty-site";
const boxesEndpoint =
    import.meta.env.VITE_BOXES_ENDPOINT?.trim() || "/table-boxes";

const catalogApi = axios.create({
    baseURL: apiBaseUrl,
    timeout: 8000,
});

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null;
};

const isCatalogItem = (value: unknown): value is ProductItem => {
    if (!isRecord(value)) {
        return false;
    }

    return (
        typeof value.id === "number" &&
        typeof value.image === "string" &&
        typeof value.title === "string" &&
        typeof value.price === "number"
    );
};

const readCatalogArray = (value: unknown): unknown[] => {
    if (Array.isArray(value)) {
        return value;
    }

    if (!isRecord(value)) {
        throw new Error("API вернул данные в неизвестном формате.");
    }

    if (Array.isArray(value.data)) {
        return value.data;
    }

    if (Array.isArray(value.items)) {
        return value.items;
    }

    if (Array.isArray(value.rows)) {
        return value.rows;
    }

    throw new Error("API вернул данные в неизвестном формате.");
};

const normalizeCatalogItems = (value: unknown): ProductItem[] => {
    const items = readCatalogArray(value);

    if (!items.every(isCatalogItem)) {
        throw new Error("API вернул товар с некорректными полями.");
    }

    return items;
};

const assertHttpApiConfig = (): void => {
    if (!apiBaseUrl) {
        throw new Error("Не задан VITE_API_BASE_URL с URL Railway HTTP API.");
    }

    if (apiBaseUrl.startsWith("postgresql://") || apiBaseUrl.startsWith("postgres://")) {
        throw new Error(
            "VITE_API_BASE_URL должен быть HTTP API URL, а не PostgreSQL URL.",
        );
    }
};

const getRequestErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status) {
            return `Не удалось загрузить данные. HTTP ${status}.`;
        }

        return "Не удалось подключиться к Railway API каталога.";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Не удалось загрузить данные каталога.";
};

const fetchCatalogItems = async (
    endpoint: string,
    signal?: AbortSignal,
): Promise<ProductItem[]> => {
    assertHttpApiConfig();

    try {
        const response = await catalogApi.get<unknown>(endpoint, {
            headers: {
                Accept: "application/json",
            },
            signal,
        });

        return normalizeCatalogItems(response.data);
    } catch (error) {
        if (axios.isCancel(error)) {
            throw error;
        }

        throw new Error(getRequestErrorMessage(error), { cause: error });
    }
};

export const getProducts = (signal?: AbortSignal): Promise<ProductItem[]> => {
    return fetchCatalogItems(productsEndpoint, signal);
};

export const getBoxes = (signal?: AbortSignal): Promise<BoxItem[]> => {
    return fetchCatalogItems(boxesEndpoint, signal);
};
