import React, { useEffect, useState } from "react";
import { Topic, Vote, VoteType } from "../..";
import { TopicItem } from "./styles";
import { v4 as uuid } from 'uuid';

interface TopicListItemProps {
  topic: Topic;
  votes:  Vote[];
  onVote: (vote: Vote) => void
}

export function TopicListItem({ topic, onVote, votes }: TopicListItemProps) {

  const totalVotes = votes.filter(vote => vote.topicId === topic.id).length;
  const likeVotes = votes.filter(vote => vote.topicId === topic.id && vote.voteType === VoteType.UP).length;
  const deslikeVotes = votes.filter(vote => vote.topicId === topic.id && vote.voteType === VoteType.DOWN).length;
  const likePercentage = totalVotes === 0 ? 0 : (likeVotes / totalVotes) * 100;

  const handleVote = (type: VoteType.UP | VoteType.DOWN) => {
    const vote: Vote = {
      id: uuid(),
      topicId: topic.id,
      voteType: type,
      createdAt: new Date(),
    };

    onVote(vote);
  };

  return (
    <li>
      <div>
        <TopicItem>
          <p className="description">{topic.description}</p>
          <div className="info-topic">
            <p>{topic.createdAt.toLocaleString()}</p>
          </div>
          <button onClick={() => handleVote(VoteType.UP)}>Like</button>
          <button onClick={() => handleVote(VoteType.DOWN)}>Deslike</button>
          <div className="progress-bar-container">
            <div
              className="progress-bar-like"
              style={{
                width: `${likePercentage}%`,
              }}
            ></div>
            <p>{likePercentage.toFixed(2)}</p>
          </div>
        </TopicItem>
      </div>
    </li>
  );
}
