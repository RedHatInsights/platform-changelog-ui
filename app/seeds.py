import yaml
from pathlib import Path


class Seeds():
    def run():
        path = Path(__file__).parent / "../services.yml"
        with path.open() as stream:
            try:
                services = yaml.safe_load(stream)["services"]
                for service in services:
                    #########################################################
                    # NOT IMPLEMENTED - NEED TO UPSERT SERVICE AND METADATA #
                    #########################################################
                    metadata = services.get(service)
                    print(f"Display Name: {metadata.get('display_name')}")
                    print(f"GitHub Repo: {metadata.get('gh_repo')}")
                    print(f"GitLap Repo: {metadata.get('gl_repo')}")
            except yaml.YAMLError as exc:
                print(f"Failed to update services: {exc}")


if __name__ == '__main__':
    Seeds.run()
