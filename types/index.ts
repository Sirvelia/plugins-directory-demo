interface SearchIntentParams {
    query: string;
    featured_authors?: string[];
    featured_plugins?: string[];
    exclude_plugins?: string[];
    exclude_premium?: boolean;
    min_last_updated?: string;
    min_active_installs?: number;
    min_rating?: number;
    max_rating?: number;
    min_tested_version?: string;
    max_results?: number;
    user_id?: number;
}

interface SearchIntent {
    total_results: number;
    search_intent_id: string;
    plugins: WordPressPlugin[]
}

interface SearchResults {
    search: string;
    results: WordPressPlugin[];
    date: string;
}

interface WordPressPlugin {
    name: string;
    slug: string;
    version: string;
    author: string;
    author_profile: string;
    contributors: Record<string, {
        profile: string;
        avatar: string;
        display_name: string;
    }>;
    requires: string;
    tested: string;
    requires_php: string;
    requires_plugins: string[];
    rating: number;
    ratings: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    num_ratings: number;
    support_url: string;
    support_threads: number;
    support_threads_resolved: number;
    active_installs: number;
    downloaded: number;
    last_updated: string;
    added: string;
    homepage: string;
    sections: {
        description: string;
        faq?: string;
        changelog?: string;
        reviews?: string;
        installation?: string;
        screenshots?: string;
    };
    short_description: string;
    description: string;
    download_link: string;
    upgrade_notice: Record<string, string>;
    screenshots: Record<string, {
        src: string;
        caption: string;
    }>;
    tags: Record<string, string>;
    stable_tag: string;
    versions: Record<string, string>;
    business_model: string;
    repository_url: string;
    commercial_support_url: string;
    donate_link: string;
    banners: {
        low?: string;
        high?: string;
    };
    icons: {
        '1x'?: string;
        '2x'?: string;
        svg?: string;
        default?: string;
    };
    blocks: Record<string, {
        $schema?: string;
        apiVersion?: number;
        version?: string;
        name: string;
        title: string;
        description?: string;
        category?: string;
        icon?: string;
        keywords?: string[];
        textdomain?: string;
        attributes?: Record<string, any>;
        example?: Record<string, any>;
        editorScript?: string;
        editorStyle?: string;
        supports?: Record<string, any>;
    }>;
    block_assets: any[];
    author_block_count: number;
    author_block_rating: number;
    blueprints: {
        filename: string;
        url: string;
    }[];
    preview_link?: string;
    language_packs: {
        type: string;
        slug: string;
        language: string;
        version: string;
        updated: string;
        package: string;
    }[];
}

interface SuggerencePluginInsights {
    summary: string;
    category: string;
    complexity_level: string;
    features: string[];
    main_purpose: string;
    tags: string[];
}