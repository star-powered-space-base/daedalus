import React, { FC, useCallback } from 'react';
import TopBar from '../../components/layout/TopBar';
import TopBarLayout from '../../components/layout/TopBarLayout';
import AnalyticsConsentForm from '../../components/profile/analytics/AnalyticsConsentForm';
import { AnalyticsAcceptanceStatus } from '../../analytics/types';
import { useActions } from '../../hooks/useActions';
import { useStores } from '../../hooks/useStores';

const AnalyticsConsentPage: FC = () => {
  const actions = useActions();
  const { networkStatus, profile, analytics } = useStores();

  const handleSubmit = useCallback(async (analyticsAccepted: boolean) => {
    await actions.profile.acceptAnalytics.trigger(
      analyticsAccepted
        ? AnalyticsAcceptanceStatus.ACCEPTED
        : AnalyticsAcceptanceStatus.REJECTED
    );
    analytics.resetAnalyticsClient();
  }, []);

  const { setAnalyticsAcceptanceRequest } = profile;
  const { isShelleyActivated } = networkStatus;

  const topbar = <TopBar isShelleyActivated={isShelleyActivated} />;
  return (
    <TopBarLayout topbar={topbar}>
      <AnalyticsConsentForm
        loading={setAnalyticsAcceptanceRequest.isExecuting}
        onConfirm={handleSubmit}
      />
    </TopBarLayout>
  );
};

export default AnalyticsConsentPage;