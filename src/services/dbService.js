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

const saveToStorage = (key, data) => {
  if (data === undefined) {
    console.error(`Attempted to save undefined to ${key}`);
    return false;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(`Error saving to ${key}:`, e);
    return false;
  }
};

const dbService = {
  // Initialize DB if not exists or merge new defaults
  init: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      saveToStorage(STORAGE_KEY, initialPages);
    } else {
      // Smart check: key exists but might be corrupted or need merging
      try {
        const pages = JSON.parse(stored);
        
        // Data integrity check: if not an array, reset
        if (!Array.isArray(pages)) {
           throw new Error("Invalid structure");
        }

        let updated = false;
        if (initialPages) {
          initialPages.forEach(defaultPage => {
            if (!pages.find(p => p.slug === defaultPage.slug)) {
              pages.push(defaultPage);
              updated = true;
            }
          });
        }
        if (updated) {
          saveToStorage(STORAGE_KEY, pages);
        }
      } catch (e) {
        console.error("Error merging defaults/corrupted data:", e);
        // Self-healing: Reset to defaults if corrupted
        console.warn("Resetting database due to corruption");
        saveToStorage(STORAGE_KEY, initialPages);
      }
    }
    
    // Check Users
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (!storedUsers) {
      saveToStorage(USERS_KEY, INITIAL_USERS);
    } else {
       try {
          JSON.parse(storedUsers);
       } catch (e) {
          console.warn("Resetting users due to corruption");
          saveToStorage(USERS_KEY, INITIAL_USERS);
       }
    }
  },

  // RESET DATABASE TO DEFAULTS (Requested by user for "deleta e cria outro")
  resetToDefaults: () => {
     saveToStorage(STORAGE_KEY, initialPages);
     saveToStorage(USERS_KEY, INITIAL_USERS);
     window.dispatchEvent(new CustomEvent("contentUpdated"));
     return initialPages;
  },

  // Get all pages
  getPages: () => {
    dbService.init();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const pages = JSON.parse(stored);
      
      if (!Array.isArray(pages)) return [];

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
        saveToStorage(STORAGE_KEY, uniquePages);
        return uniquePages;
      }

      return pages;
    } catch (e) {
      console.error("Error reading database:", e);
      // Fallback to initial pages (in memory) to prevent crash
      return initialPages || [];
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

    saveToStorage(STORAGE_KEY, updatedPages);
    window.dispatchEvent(new CustomEvent("contentUpdated"));
    return updatedPages;
  },

  // Delete page
  deletePage: (id) => {
    const pages = dbService.getPages();
    const updatedPages = pages.filter((p) => p.id !== parseInt(id));
    saveToStorage(STORAGE_KEY, updatedPages);
    return updatedPages;
  },

  // --- USER MANAGEMENT ---

  getUsers: () => {
    dbService.init();
    try {
      const stored = localStorage.getItem(USERS_KEY);
      return stored ? JSON.parse(stored) : [];
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
              password: userData.password || u.password // Maintain password if not provided
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

    saveToStorage(USERS_KEY, updatedUsers);
    return updatedUsers;
  },

  deleteUser: (id) => {
    const users = dbService.getUsers();
    const updatedUsers = users.filter((u) => u.id !== parseInt(id));
    saveToStorage(USERS_KEY, updatedUsers);
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
    saveToStorage(SETTINGS_KEY, updated);
    return updated;
  },

  // --- BACKUP & RESTORE ---
  backupData: () => {
    try {
      const data = {
        pages: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
        users: JSON.parse(localStorage.getItem(USERS_KEY) || "[]"),
        settings: dbService.getSettings(),
        transactions: dbService.getTransactions(),
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
        saveToStorage(STORAGE_KEY, data.pages);
      if (data.users)
        saveToStorage(USERS_KEY, data.users);
      if (data.settings) {
        const SETTINGS_KEY = "admac_settings_db";
        saveToStorage(SETTINGS_KEY, data.settings);
      }
      if (data.transactions)
        saveToStorage("admac_transactions_db", data.transactions);

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
      const stored = localStorage.getItem("admac_transactions_db");
      return stored ? JSON.parse(stored) : [];
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

    saveToStorage("admac_transactions_db", updated);
    return updated;
  },

  deleteTransaction: (id) => {
    const transactions = dbService.getTransactions();
    const updated = transactions.filter((t) => t.id !== parseInt(id));
    saveToStorage("admac_transactions_db", updated);
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
