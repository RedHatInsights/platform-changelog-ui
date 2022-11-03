export const COMMIT_FILTERS = [
    'Repo', 'Ref', 'Author', 'Merged By'
];

export const DEPLOY_FILTERS = [
    'Cluster', 'Image', 'Ref', 'Repo'
];

export const FILTER_MAP = [
    {
        path: "/services",
        show: false,
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
    },
    {
        path: "/.*",
        show: false,
    },
];
