const { NODE_ENV } = process.env;
// Get the Canny API key from the environment variables
const { CANNY_API_KEY } = process.env;


import { createIssue } from '../controllers/github.controller.js';


export const webhook = async (req, res) => {
  console.log('POST /canny/');
  if (NODE_ENV === 'development') {
    console.log('req.body:', req.body);
  }

  try {
    const { type } = req.body;
    console.log('type:', type);
    switch (type) {
      case 'post.status_changed':
        const { status } = req.body.object;
        console.log('Status changed to', status);

        if (status === 'planned' || status === 'in progress') {
          const { id, title, details, url } = req.body.object;
          let body = `${(details != '' ? details : 'No details from post.')}<br /><br />Request at canny.io:<br />${url}<br /><br />canny#${id}`;
          const issueNumber = await createIssue(id, title, body);
          console.log('Issue number:', issueNumber);
        }
        // under review
        // planned
        // in progress
        // complete
        // closed
        break;
      default:
        console.log('Unhandled event type:', type);
        break;
    }
  }
  catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).send();
  }

  res.status(200).send();
}

const updatePostWithIssueNumber = async (id, issueNumber) => {
  console.log('Updating post in Canny');
  try {
    const response = await fetch('https://canny.io/api/v1/posts/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: CANNY_API_KEY,
        postID: id,
        customFields: {
          issueNumber: issueNumber
        }
      })
    })

    const data = await response.json();
    console.log('Post updated:', data);
  } catch (error) {
    console.error('Error updating post in Canny:', error);
  }
}