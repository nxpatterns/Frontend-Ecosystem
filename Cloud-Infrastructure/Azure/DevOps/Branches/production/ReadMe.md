# Production Min. Necessary Settings

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=false} -->

<!-- code_chunk_output -->

- [Settings](#settings)
  - [Advanced Security](#advanced-security)
- [Policies](#policies)
  - [Branch Policies](#branch-policies)
  - [Build Validation](#build-validation)
  - [Status Checks](#status-checks)
    - [Advanced](#advanced)
  - [Automatically Included Reviewers](#automatically-included-reviewers)
- [Security](#security)

<!-- /code_chunk_output -->

## Settings

### Advanced Security

Advanced Security is billed based on the number of unique active committers across all enabled repositories in your subscription.

View billing: (https://dev.azure.com/\<your_company>/_settings/billing

View alerts: https://dev.azure.com/\<your_company>/_git/\<your_project>/alerts

For setup tips, [view documentation](https://aka.ms/advanced-security) or [contact sales](https://aka.ms/advanced-security/sales).

## Policies

### Branch Policies

Now, to ensure no direct pushes to the production branch and only allow merges through pull requests:

- Under "Branch Policies", turn on "Require a minimum number of reviewers".
- Set the minimum number of reviewers to the number you deem appropriate.
- Optionally, enable "Check for linked work items" and "Check for comment resolution" if these are relevant for your workflow.
- In "Limit merge types", select the merge strategy that aligns with your branch policies

### Build Validation

- Click on the "+" next to "Build Validation".
- Select the build pipeline that should run before merging.
- Configure additional settings as needed (e.g., triggers, policy requirements).

### Status Checks

- Click on the "+" next to "Status Checks".
- Choose the service hook you want to use for status checks.
- Configure it according to your criteria for the pull request to be mergeable.

#### Advanced

Set "Authorized identity".

### Automatically Included Reviewers

- Click on the "+" under "Automatically included reviewers".
- Specify the groups or users that should be automatically included in reviews.
- Set conditions for when they should be included if needed.

## Security

- Bypass policies when completing pull requests: Deny
- Bypass policies when pushing: Deny
- Contribute: Allow
- Edit policies: Deny
- Force push (rewrite history, delete branches and tags): Deny
- Manage permissions: Not set
- Remove others' locks: Not set
