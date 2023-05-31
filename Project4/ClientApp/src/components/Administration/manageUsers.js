import React, { useState } from "react";
import axios from "axios";

function UserSuspension() {
  const [userId, setUserId] = useState("");
  const [duration, setDuration] = useState(1);
  const [isUserSuspended, setIsUserSuspended] = useState(false);
  const [isUserUnsuspended, setIsUserUnsuspended] = useState(false);

  const handleSuspendSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/users/${userId}/suspend`, {
        duration,
      });

      if (response.data.isSuspended) {
        setIsUserSuspended(true);
      } else {
        // Display an error message to the user
      }
    } catch (error) {
      // Handle the error
    }
  };

  const handleUnsuspendSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/users/${userId}/unsuspend`);

      if (response.data.isUnsuspended) {
        setIsUserUnsuspended(true);
      } else {
        // Display an error message to the user
      }
    } catch (error) {
      // Handle the error
    }
  };

  if (isUserSuspended) {
    return <p>User account has been suspended for {duration} day(s)</p>;
  }

  if (isUserUnsuspended) {
    return <p>User account has been unsuspended</p>;
  }

  return (
    <div>
      <form onSubmit={handleSuspendSubmit}>
        <label>
          Enter the ID of the user account to suspend:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <label>
          Enter the duration of the suspension (in days):
          <input
            type="number"
            min={1}
            max={365}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </label>
        <button type="submit">Suspend user account</button>
      </form>
      <form onSubmit={handleUnsuspendSubmit}>
        <label>
          Enter the ID of the user account to unsuspend:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <button type="submit">Unsuspend user account</button>
      </form>
    </div>
  );
}

export default UserSuspension;

/*
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

public class UsersController : ApiController
{
    [HttpPut]
    [Route("api/users/{userId}/suspend")]
    public async Task<IHttpActionResult> SuspendUser(string userId, [FromBody] SuspensionRequest request)
    {
        // Here, you would perform a check to ensure that the user
        // associated with the provided userId exists and is not already
        // suspended. If the user is valid, you would suspend their account
        // for the duration specified in the request.

        // For the purposes of this example, we'll just assume that
        // the user is valid and suspend their account for the duration
        // specified in the request.

        return Ok(new { isSuspended = true });
    }

    [HttpPut]
    [Route("api/users/{userId}/unsuspend")]
    public async Task<IHttpActionResult> UnsuspendUser(string userId)
    {
        // Here, you would perform a check to ensure that the user
        // associated with the provided userId exists and is suspended.
        // If the user is valid, you would unsuspend their account.

        // For the purposes of this example, we'll just assume that
        // the user is valid and unsuspend their account.

        return Ok(new { isUnsuspended = true });
    }
}

public class SuspensionRequest
{
    public int Duration { get; set; }
}
*/