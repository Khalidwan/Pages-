export interface User {
  id: string;
  email: string;
  name: string;
  isPro: boolean;
  credits: number;
  referralCode: string;
}

export interface Section {
  id: string;
  type: 'hero' | 'features' | 'testimonials' | 'cta' | 'footer';
  content: any;
}

export interface LandingPage {
  id: string;
  userId: string;
  title: string;
  productName: string;
  price: string;
  description: string;
  benefits: string[];
  imageUrl: string;
  reviews: { author: string; text: string; rating: number }[];
  whatsappNumber: string;
  buttonText: string;
  createdAt: string;
  views: number;
  clicks: number;
  removeWatermark: boolean;
  sections?: Section[];
}

const STORAGE_KEYS = {
  USER: 'adrocket_user',
  USERS: 'adrocket_users',
  PAGES: 'adrocket_pages',
};

export const storage = {
  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  
  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    // Also update the user in the main database
    storage.saveUserToDatabase(user);
  },
  
  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Mock Database Methods
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  saveUserToDatabase: (user: User) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  findUserByEmail: (email: string): User | undefined => {
    const users = storage.getUsers();
    return users.find(u => u.email === email);
  },

  findUserByReferralCode: (code: string): User | undefined => {
    const users = storage.getUsers();
    return users.find(u => u.referralCode === code);
  },

  getPages: (userId: string): LandingPage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    const pages: LandingPage[] = data ? JSON.parse(data) : [];
    return pages.filter(p => p.userId === userId);
  },

  getAllPages: (): LandingPage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    return data ? JSON.parse(data) : [];
  },

  savePage: (page: LandingPage) => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    const pages: LandingPage[] = data ? JSON.parse(data) : [];
    const index = pages.findIndex(p => p.id === page.id);
    
    if (index >= 0) {
      pages[index] = page;
    } else {
      pages.push(page);
    }
    
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
  },

  deletePage: (pageId: string) => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    if (!data) return;
    const pages: LandingPage[] = JSON.parse(data);
    const newPages = pages.filter(p => p.id !== pageId);
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(newPages));
  },

  getPage: (pageId: string): LandingPage | undefined => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    const pages: LandingPage[] = data ? JSON.parse(data) : [];
    return pages.find(p => p.id === pageId);
  },
  
  incrementViews: (pageId: string) => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    if (!data) return;
    const pages: LandingPage[] = JSON.parse(data);
    const pageIndex = pages.findIndex(p => p.id === pageId);
    if (pageIndex >= 0) {
      pages[pageIndex].views = (pages[pageIndex].views || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    }
  },

  incrementClicks: (pageId: string) => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    if (!data) return;
    const pages: LandingPage[] = JSON.parse(data);
    const pageIndex = pages.findIndex(p => p.id === pageId);
    if (pageIndex >= 0) {
      pages[pageIndex].clicks = (pages[pageIndex].clicks || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    }
  }
};
