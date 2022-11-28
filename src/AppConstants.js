export const SERVICE_FILTERS = [
    'Name', 'Display_Name', 'Tenant', 'Namespace', 'Branch'
];

export const COMMIT_FILTERS = [
    'Repo', 'Ref', 'Author', 'Merged_By'
];

export const DEPLOY_FILTERS = [
    'Cluster', 'Image', 'Ref', 'Repo'
];

export const FILTER_MAP = [
    {
        path: "/services",
        show: true,
        options: SERVICE_FILTERS
    },
    {
        path: "/commits",
        show: true,
        options: COMMIT_FILTERS,
    },
    {
        path: "/deploys",
        show: true,
        options: DEPLOY_FILTERS,
    },
    {
        path: "/",
        show: false,
        options: []
    },
    {
        path: "/.*",
        show: false,
        options: []
    },
];
