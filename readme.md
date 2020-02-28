# issue-autotagging

This action applies labels to your issues based on a simple string in your issue.

For example:
```
[foo, bar, type: bug, area: server-host]
```

Will apply `foo`, `bar`, `type: bug`, and `area: server-host` tags.

## Inputs

### `repo-token`

**Required** GitHub repo token. e.g. "${{ secrets.GITHUB_TOKEN }}"

## Example usage

```yaml
on: [issues]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: Tag issues
    steps:
    - name: Issue tagging
      id: hello
      uses: christopheranderson/github-action-playground@v1
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
```

## Code of conduct

[Contributor Covenant 1.4](https://www.contributor-covenant.org/version/1/4/code-of-conduct/)

Please report enforcement violations to the email on my [GitHub profile](https://github.com/christopheranderson).

## LICENSE
[MIT](./LICENSE)