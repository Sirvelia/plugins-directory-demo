import { create } from 'zustand'

interface CompareStore {
    plugins: WordPressPlugin[]
    isComparing: boolean
    setIsComparing: (isComparing: boolean) => void
    addPlugin: (plugin: WordPressPlugin) => void
    removePlugin: (plugin: WordPressPlugin) => void
    clearPlugins: () => void
}

export const useCompareStore = create<CompareStore>((set) => ({
    plugins: [],
    isComparing: false,
    setIsComparing: (isComparing) => set({ isComparing }),
    addPlugin: (plugin) => set((state) => {
        if (state.plugins.length >= 4) {
            return state; // Don't add if already at maximum
        }
        if (state.plugins.some(p => p.slug === plugin.slug)) {
            return state; // Don't add if already in the list
        }
        return { plugins: [...state.plugins, plugin] };
    }),
    removePlugin: (plugin) => set((state) => ({ plugins: state.plugins.filter((p) => p.slug !== plugin.slug) })),
    clearPlugins: () => set({ plugins: [] }),
}))