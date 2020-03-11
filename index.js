//@ts-check

const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const token = core.getInput('repo-token', { required: true });

    const issue = github.context.payload.issue;

    if (!issue) {
        console.log('Not an issue; skipping');
        return;
    }

    const client = new github.GitHub(token);

    const {data: { labels: existingIssues }} = await client.issues.get({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: issue.number,
    })

    const {data: issueEvents} = await client.issues.listEvents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: issue.number,
    })

    const previouslyLabeled = issueEvents.find(v=> v.event === "labeled" && v.actor.login === "github-actions[bot]");

    if(!!previouslyLabeled) {
        console.log(JSON.stringify(previouslyLabeled, null, ' '));
        console.log('Issue was previously labelled; skipping');
        return;
    }

    const tags = extractTags(issue.body).concat(existingIssues);

    await client.issues.update({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: issue.number,
        labels: tags
    })

}

function extractTags(body) {
    const rgx = /(\[.+])/gm

    const allTags = [];

    for (const group of body.matchAll(rgx)) {
        const match = group[0]
        console.log(`found match: ${match}`);
        const tags = match.replace('[', '').replace(']', '').split(',').map(x => x.trim())
        console.log(`extracted tags: ${tags.reduce((p, c, i) => p + (i === 0 ? '' : ',') + `"${c}"`, '')}`);
        allTags.push(...tags);
    }

    console.log("#########");

    console.log(`Extracted ${allTags.length} total tags.\nTags: ${allTags.reduce((p, c, i) => p + (i === 0 ? '' : ',') + `"${c}"`, '')}`)

    return allTags;
}

run().catch((e)=>{
    console.error(e);
    core.setFailed(e);
})



// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }
