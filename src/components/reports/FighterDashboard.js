import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { getReport } from '../../state/actions/fighterActions';

const FighterDashboard = ({ currentUser }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    if (currentUser.isFighter) {
      dispatch(getReport());
    }
  }, [currentUser.isFighter, dispatch]);
  const report = useSelector(state => state.fighters.report);

  return (
    <div className="dashboard row col-12 col-sm-7 offset-sm-1">
      <h2 className="col-12"> {intl.formatMessage({ id: 'dashboard.title' })} </h2>
      <div className="col-12 col-sm-5">
        <h3>{intl.formatMessage({ id: 'dashboard.pageVisits' })}</h3>
        <h4> {report.pageVisits} </h4>
      </div>
      <div className="col-12 col-sm-5">
        <h3>{intl.formatMessage({ id: 'dashboard.newSubs' })}</h3>
        <h4> {report.subscriptors} </h4>
      </div>
      <div className="col-12 col-sm-5">
        <h3>{intl.formatMessage({ id: 'dashboard.percentageVisitsPerSub' })}</h3>
        <h4> {report.subscribersPerVisitors} </h4>
      </div>
      <div className="col-12 col-sm-5">
        <h3>{intl.formatMessage({ id: 'dashboard.income' })}</h3>
        <h4> {report.monthlyIncome} </h4>
      </div>
    </div>
  );
};

export default FighterDashboard;
