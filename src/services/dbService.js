import { pagesData as initialPages } from "./mockData";

const STORAGE_KEY = "admac_pages_db";
const USERS_KEY = "admac_users_db";

const INITIAL_USERS = [
  {
    id: 1,
    name: "Administrador",
    username: "admin",
    password: "123",
    role: "admin",
    status: "Ativo",
    lastLogin: "2024-03-15",
  },
];

const dbService = {
  // Initialize DB if not exists
  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPages));
    }
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    }
  },

  // Get all pages
  getPages: () => {
    dbService.init();
    try {
      const pages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      // Auto-fix: Remove duplicates by slug
      const seenSlugs = new Set();
      const uniquePages = [];
      let hasDuplicates = false;

      pages.forEach((page) => {
        if (!seenSlugs.has(page.slug)) {
          seenSlugs.add(page.slug);
          uniquePages.push(page);
        } else {
          hasDuplicates = true;
        }
      });

      if (hasDuplicates) {
        console.warn("Duplicates removed from database");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uniquePages));
        return uniquePages;
      }

      return pages;
    } catch (e) {
      console.error("Error reading database:", e);
      return [];
    }
  },

  // Get single page by ID
  getPageById: (id) => {
    const pages = dbService.getPages();
    return pages.find((p) => p.id === parseInt(id));
  },

  // Get single page by slug
  getPageBySlug: (slug) => {
    const pages = dbService.getPages();
    return pages.find((p) => p.slug === slug);
  },

  // Add or Update page
  upsertPage: (pageData) => {
    const pages = dbService.getPages();
    let updatedPages;

    if (pageData.id) {
      // Update
      updatedPages = pages.map((p) =>
        p.id === parseInt(pageData.id)
          ? {
              ...p,
              ...pageData,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : p,
      );
    } else {
      // Create new
      const newId =
        pages.length > 0 ? Math.max(...pages.map((p) => p.id)) + 1 : 1;
      const newPage = {
        ...pageData,
        id: newId,
        visits: 0,
      };
      updatedPages = [...pages, newPage];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPages));
    window.dispatchEvent(new CustomEvent("contentUpdated"));
    return updatedPages;
  },

  // Delete page
  deletePage: (id) => {
    const pages = dbService.getPages();
    const updatedPages = pages.filter((p) => p.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPages));
    return updatedPages;
  },

  // --- USER MANAGEMENT ---

  getUsers: () => {
    dbService.init();
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      console.error("Error reading users database:", e);
      return [];
    }
  },

  getUserById: (id) => {
    const users = dbService.getUsers();
    return users.find((u) => u.id === parseInt(id));
  },

  upsertUser: (userData) => {
    const users = dbService.getUsers();
    let updatedUsers;

    if (userData.id) {
      // Update
      updatedUsers = users.map((u) =>
        u.id === parseInt(userData.id)
          ? {
              ...u,
              ...userData,
            }
          : u,
      );
    } else {
      // Create new
      const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = {
        ...userData,
        id: newId,
        status: userData.status || "Ativo",
        lastLogin: "-",
      };
      updatedUsers = [...users, newUser];
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return updatedUsers;
  },

  deleteUser: (id) => {
    const users = dbService.getUsers();
    const updatedUsers = users.filter((u) => u.id !== parseInt(id));
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return updatedUsers;
  },

  // --- SETTINGS MANAGEMENT ---
  getSettings: () => {
    const SETTINGS_KEY = "admac_settings_db";
    const defaultSettings = {
      siteName: "ADMAC",
      logoUrl: "", // Se vazio, usa o ícone padrão
      primaryColor: "#6366f1",
    };

    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  },

  updateSettings: (newSettings) => {
    const SETTINGS_KEY = "admac_settings_db";
    const current = dbService.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  },

  // --- BACKUP & RESTORE ---
  backupData: () => {
    try {
      const data = {
        pages: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
        users: JSON.parse(localStorage.getItem(USERS_KEY) || "[]"),
        settings: dbService.getSettings(),
        timestamp: new Date().toISOString(),
        version: "1.0",
      };
      return JSON.stringify(data, null, 2);
    } catch (e) {
      console.error("Error generating backup:", e);
      return null;
    }
  },

  restoreData: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);

      if (data.pages)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.pages));
      if (data.users)
        localStorage.setItem(USERS_KEY, JSON.stringify(data.users));
      if (data.settings) {
        const SETTINGS_KEY = "admac_settings_db";
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings));
      }
      if (data.transactions)
        localStorage.setItem(
          "admac_transactions_db",
          JSON.stringify(data.transactions),
        );

      window.dispatchEvent(new CustomEvent("contentUpdated"));
      return { success: true, message: "Dados restaurados com sucesso!" };
    } catch (e) {
      console.error("Error restoring data:", e);
      return {
        success: false,
        message: "Erro ao restaurar dados. Arquivo inválido.",
      };
    }
  },

  // --- FINANCIAL MODULE ---
  getTransactions: () => {
    try {
      return JSON.parse(localStorage.getItem("admac_transactions_db")) || [];
    } catch (e) {
      return [];
    }
  },

  upsertTransaction: (data) => {
    const transactions = dbService.getTransactions();
    let updated;

    if (data.id) {
      updated = transactions.map((t) =>
        t.id === parseInt(data.id) ? { ...t, ...data } : t,
      );
    } else {
      const newId =
        transactions.length > 0
          ? Math.max(...transactions.map((t) => t.id)) + 1
          : 1;
      updated = [
        { ...data, id: newId, createdAt: new Date().toISOString() },
        ...transactions,
      ];
    }

    localStorage.setItem("admac_transactions_db", JSON.stringify(updated));
    return updated;
  },

  deleteTransaction: (id) => {
    const transactions = dbService.getTransactions();
    const updated = transactions.filter((t) => t.id !== parseInt(id));
    localStorage.setItem("admac_transactions_db", JSON.stringify(updated));
    return updated;
  },

  getCategories: () => {
    return {
      receitas: ["Dízimos", "Ofertas", "Vendas", "Doações", "Outros"],
      despesas: [
        "Água",
        "Energia",
        "Internet",
        "Aluguel",
        "Manutenção",
        "Salários",
        "Ministerial",
        "Outros",
      ],
    };
  },
};

export default dbService;
