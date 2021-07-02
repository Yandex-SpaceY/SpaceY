import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PAGE_NAMES } from 'constants/commonConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { LEADER_CONSTANTS } from 'constants/leaderConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { formatBigNumbers } from 'utils';
import { leadersInfo, ILeaders } from './mock';

import './leaderboard.scss';

type LeaderState = ILeaders[] | []

const Leaderboard: FC = (): ReactElement => {
  const [ leaders, setLeaders ] = useState<LeaderState>([]);

  useEffect(() => setLeaders(leadersInfo), []);

  const showLeaders = () => (
    leaders.map(({ place, avatar, codename, score }) => {
      const formattedPlace = formatBigNumbers(place);
      const formattedScore = formatBigNumbers(score);

      return (
        <div key={place} className='leader'>
          <div className='leader-info'>
            <span className='leader-info-place' title={formattedPlace}>{formattedPlace}</span>
            <div className='profile-image profile-image-small'>{avatar}</div>
          </div>
          <div className='leader-data'>
            <span className='leader-data-name' title={codename}>{codename}</span>
            <span title={formattedScore}>{formattedScore}</span>
          </div>
        </div>
      );
    })
  );

  return (
    <div className='main'>
      <div className='content-wrapper-leaderboard'>
        <div className='content'>
          <h2>{PAGE_NAMES.LEADERBOARD}</h2>

          {leaders.length
            ? showLeaders()
            : <h3>{LEADER_CONSTANTS.BE_LEADER}</h3>
          }

          <div className='content-links'>
            <Link to={ROUTE_CONSTANTS.GAME} className='content-links-game'>
              {LINK_TEXTS.NEW_GAME}
            </Link>
            <Link to={ROUTE_CONSTANTS.DASHBOARD}>
              {LINK_TEXTS.DASHBOARD}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
