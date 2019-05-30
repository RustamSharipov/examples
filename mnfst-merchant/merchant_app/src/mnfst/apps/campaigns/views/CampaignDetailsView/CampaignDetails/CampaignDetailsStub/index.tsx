import React from 'react';
import { DescriptionStub } from 'apps/ui/components/Description';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import { TextControlStub } from 'apps/ui/components/TextControl';
import {
  CampaignDetailsBody, CampaignDetailsMain, CampaignDetailsAside,
} from 'apps/campaigns/components/CampaignDetails';
import { CampaignCreativeStub, CampaignCreatives } from 'apps/ui/components/CampaignMedia';

const CampaignDetailsStub = () => {
  return (
    <CampaignDetailsBody>
      <CampaignDetailsMain>
        <PageSection
          titleStub={true}
          descriptionStub={true}>
          <FormRow>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
          </FormRow>
        </PageSection>
        <PageSection
          titleStub={true}
          descriptionStub={true}>
          <FormRow>
            <FormRowSection part="two-thirds">
              <TextControlStub />
            </FormRowSection>
          </FormRow>
          <FormRow>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
            <FormRowSection
              part="one-third"
              align="center">
              <DescriptionStub />
            </FormRowSection>
          </FormRow>
        </PageSection>
        <PageSection titleStub={true}>
          <FormRow>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
          </FormRow>
        </PageSection>
        <PageSection
          titleStub={true}
          descriptionStub={true}>
          <FormRow>
            <FormRowSection part="two-thirds">
              <TextControlStub />
            </FormRowSection>
          </FormRow>
          <FormRow>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
          </FormRow>
          <FormRow>
            <DescriptionStub />
          </FormRow>
        </PageSection>
        <PageSection
          titleStub={true}
          descriptionStub={true}>
          <FormRow>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
          </FormRow>
        </PageSection>
        <PageSection
          titleStub={true}
          descriptionStub={true}>
          <FormRow>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
          </FormRow>
        </PageSection>
        <PageSection
          titleStub={true}
          descriptionStub={true}>
          <FormRow>
            <FormRowSection part="one-third">
              <TextControlStub />
            </FormRowSection>
            <FormRowSection part="two-thirds">
              <DescriptionStub />
            </FormRowSection>
          </FormRow>
        </PageSection>
      </CampaignDetailsMain>
      <CampaignDetailsAside>
        <CampaignCreatives>
          <CampaignCreativeStub placement="feed" />
          <CampaignCreativeStub placement="story" />
        </CampaignCreatives>
      </CampaignDetailsAside>
    </CampaignDetailsBody>
  );
};

export default CampaignDetailsStub;
