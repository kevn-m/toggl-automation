const axios = require("axios")
const base64 = require("base-64")
const dotenv = require("dotenv").config()
const moment = require("moment")

const workspaceId = 1442626
const clientId = 16566277

const baseURL = "https://api.track.toggl.com/api/v9"
const endpoint = `/workspaces/${workspaceId}/time_entries`
const apiKey = process.env.API_TOKEN

// GET request to get my user data
axios
  .get("https://api.track.toggl.com/api/v9/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64.encode(`${apiKey}:api_token`)}`,
    },
    params: {
      with_related_data: true,
    },
  })
  .then((response) => {
    const filteredProjects = response.data.projects.filter((project) =>
      project.name.includes("Captur3d")
    )
    console.log(filteredProjects)
  })
  .catch((error) => {
    console.error(error)
  })

// POST request to create a new time entry
axios
  .post(
    `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64.encode(`${apiKey}:api_token`)}`,
      },
      body: {
        billable: false,
        created_with: "my-app",
        description: "Testing Toggl API",
        project_id: clientId,
        workspace_id: workspaceId,
        start: moment.utc().startOf("day").add(9, "hours").format(),
        end: moment.utc().startOf("day").add(17, "hours").format(),
      },
    }
  )
  .then((response) => {
    console.log("Response:", response.data)
  })
  .catch((error) => {
    console.error("Error:", error)
  })
