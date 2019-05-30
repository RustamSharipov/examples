import React from 'react';
import ButtonsSet from 'apps/ui/components/ButtonsSet';
import { BalanceStub } from 'apps/payments/components/Balance';
import { ButtonStub } from 'apps/ui/components/Button';
import { ContentFrameSet, ContentFrame, ContentFrameCTA } from 'apps/ui/components/ContentFrame';
import { PaymentAccountStub, PaymentAccounts } from 'apps/payments/components/PaymentAccount';
import { TitleStub } from 'apps/ui/components/Title';
import styles from './style.css';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import { TextStub } from 'apps/ui/components/Text';

const BillingPaymentsStub = () => {
  return (
    <div className={styles.billingPayments}>
      <ContentFrameSet>
        <ContentFrame className="grid-column grid-columns-6">
          <div className={styles.paymentHeader}>
            <TitleStub level={3} />
          </div>
          <PaymentAccounts>
            <PaymentAccountStub />
          </PaymentAccounts>
          <ContentFrameCTA>
            <ButtonsSet>
              <ButtonStub />
              <ButtonStub />
            </ButtonsSet>
          </ContentFrameCTA>
        </ContentFrame>
        <ContentFrame className="grid-column grid-columns-6">
          <div className={styles.paymentHeader}>
            <TitleStub level={3} />
          </div>
          <div className={styles.paymentSummary}>
            <BalanceStub />
            <ContentFrameCTA>
              <FlexLayout justifyContent="space-between">
                <FlexLayoutChild className="grid-columns-5">
                  <ButtonStub className="grid-columns-9" />
                </FlexLayoutChild>
                <FlexLayoutChild className="grid-columns-7">
                  <div className="paragraph">
                    <TextStub />
                    <TextStub />
                    <TextStub />
                  </div>
                </FlexLayoutChild>
              </FlexLayout>
            </ContentFrameCTA>
          </div>
        </ContentFrame>
      </ContentFrameSet>
    </div>
  );
};

export default BillingPaymentsStub;
