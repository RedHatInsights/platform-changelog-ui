from schema import Schema, SchemaError, Regex, Optional
import yaml

service_schema = Schema({
    "services": {
        str: {
            "display_name": str,
            Optional("gh_repo"): Regex(r'^(http|https)://(www.)?github.com\b/[a-zA-Z0-9]+\b/[a-zA-Z0-9@:%._\\+~#?&=-]*$'),
            Optional("gl_repo"): Regex(r'^(http|https)://(www.)?gitlab.cee.redhat.com\b/[a-zA-Z0-9]+\b/[a-zA-Z0-9@:%._\\+~#?&=-]*$'),
            "branch": str,
            "namespace": str,
        }
    }
})

with open('services.yml') as f:
    data = yaml.safe_load(f)

try:
    service_schema.validate(data)
except SchemaError as e:
    print(e)
