export {
    locales,
    defaultLocale,
    LOCALE_COOKIE,
    isLocale,
    localeDirection,
} from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./get-dictionary";
export { getDictionarySync } from "./get-dictionary";
export { LocaleProvider, useLocale } from "./LocaleProvider";
export { useTranslations } from "./use-translations";
export {
    getCatalogEntry,
    localizeProduct,
    localizeListingItem,
    localizeCategory,
} from "./catalog";
export type { CategoryPageCopy } from "./catalog";
export {
    getServicesMessages,
    getServiceCopy,
    localizeService,
    localizeServices,
    localizeHighlightCopy,
    localizeFeatureLabels,
    localizeTestimonials,
} from "./services-catalog";
export type { ServiceSlug, ServicesMessages } from "./services-catalog";
export {
    getProjectsMessages,
    getProjectCopy,
    localizeProject,
    localizeProjects,
    localizeProjectHighlights,
    localizeProjectFeatureLabels,
    localizeProjectFilterLabel,
} from "./projects-catalog";
export type { ProjectSlug, ProjectsMessages } from "./projects-catalog";
export {
    getBlogsMessages,
    getBlogCopy,
    localizeBlog,
    localizeBlogs,
    localizeBlogCategory,
    localizeBlogTag,
    formatLocalizedBlogDate,
    formatBlogCommentsLabel,
} from "./blogs-catalog";
export type { BlogSlug, BlogsMessages } from "./blogs-catalog";
