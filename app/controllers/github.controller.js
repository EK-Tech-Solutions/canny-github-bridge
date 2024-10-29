const { GITHUB_OWNER, GITHUB_REPOSITORY, GITHUB_PERSONAL_ACCESS_TOKEN } = process.env;

export const createIssue = async (id, title, body) => {
  console.log('Creating issue in GitHub');

  try {
    // code to create issue in GitHub
    const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        title: title,
        body: body,
        labels: ['enhancement','canny.io']
      })
    })

    const data = await response.json();
    //console.log('Issue created:', data);

    const { number } = data;
    //console.log('Issue number:', number);
    return number;
  } catch (error) {
    console.error('Error creating issue in GitHub:', error);
  }
}