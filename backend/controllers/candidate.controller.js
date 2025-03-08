import Candidate from "../models/candidate.model.js";
import User from "../models/user.model.js";
import io from "../server.js";

// Controller function for creating a new candidate
export const createCandidate = async (req, res) => {
  try {
    // Check if a candidate with the given email already exists
    let candidate = await Candidate.findOne({ email: req.body.email });

    if (candidate) return res.status(400).send("candidate already exists");

    // Create a new candidate object from the request body
    candidate = req.body;
    await Candidate.create(candidate);
    res.status(201).send("candidate created");
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("candidate not created");
    console.error(error);
  }
};

// Controller function for updating an existing candidate
export const updateCandidate = async (req, res) => {
  try {
    const candidateID = req.params.id;
    if (!candidateID) return res.status(404).send("candidate not exists");

    // Find the candidate by ID and update it with the request body
    let candidate = await Candidate.findByIdAndUpdate(candidateID, req.body);
    await candidate.save();

    res.status(200).send(`${candidate.name} is updated successfully`);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("candidate is not updated");
    console.error(error);
  }
};

// Controller function for deleting a candidate
export const deleteCandidate = async (req, res) => {
  try {
    const candidateID = req.params.id;

    if (!candidateID) return res.status(404).send("candidate not exists");

    // Find the candidate by ID and delete it
    let candidate = await Candidate.findByIdAndDelete(candidateID);

    console.log(candidate);
    res.status(200).send(`${candidate.name} is deleted successfully`);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("candidate not deleted");
    console.error(error);
  }
};

// Controller function for showing all candidates
export const showCandidates = async (req, res) => {
  try {
    // Find all candidates
    const candidates = await Candidate.find();
    if (!candidates) return res.status(404).send("no candidate available");

    // Send the list of candidates as a response
    res.status(200).send(candidates);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("internal server error");
    console.error(error);
  }
};

// Controller function for voting a candidate
export const voteCandidate = async (req, res) => {
  const candidateID = req.params.id;
  const userID = req.user;
  try {
    // Find the candidate by ID
    let candidate = await Candidate.findById(candidateID);
    if (!candidate) return res.status(404).send("candidate not found");

    // Find the user by ID
    let user = await User.findById(userID);
    if (!user) return res.status(404).send("user not found");

    // Check if the user has already voted
    if (user.isVoted) return res.status(400).send("user can vote only once");

    // Add the user's vote to the candidate
    candidate.votes.push({ user: user._id });
    candidate.voteCount++;
    user.isVoted = true;

    // Save the updated candidate and user objects to the database
    await candidate.save();
    await user.save();

    const updatedCandidates = await Candidate.find().sort({ voteCount: -1 });

    const votes = updatedCandidates.map((data) => {
      return {
        candidateID: data._id,
        party: data.party,
        count: data.voteCount,
      };
    });
    io.emit("voteUpdate", votes);

    res.status(200).send("your vote is submitted");
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("internal server error");
    console.error(error);
  }
};

// Controller function for getting the vote count of all candidates
export const voteCount = async (req, res) => {
  try {
    // Find all candidates and sort them by vote count in descending order
    const candidate = await Candidate.find().sort({ voteCount: -1 });

    const votes = candidate.map((data) => {
      return {
        candidateID: data._id,
        party: data.party,
        count: data.voteCount,
      };
    });
    // Send the vote count as a response
    res.status(200).send(votes);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("internal server error");
    console.error(error);
  }
};
