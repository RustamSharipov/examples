import React from 'react';
import Article from 'apps/ui/components/Article';
import { PageSection } from 'apps/ui/components/Page';
import { LinksGrid, LinksGridItem } from 'apps/ui/components/LinksGrid';
import { localizeString } from 'utils/localization';
import FileTypes from 'apps/ui/components/FileTypes';
import SocialNetworks from 'apps/ui/components/SocialNetworks';
import ScreenshotPreview from 'apps/ui/components/ScreenshotPreview';
import Title from 'apps/ui/components/Title';
import { ALLOWED_SOCIAL_NETWORKS } from 'constants/campaigns';
import facebookStaticSizesImage from './images/facebookStaticSizes.jpg';
import instagramStaticSizesImage from './images/instagramStaticSizes.jpg';
import twitterStaticSizesImage from './images/twitterStaticSizes.jpg';

interface IStaticCreativesGuidelinesProps {
  onTitleInit?: (params: any) => void;
}

const StaticCreativesGuidelines: React.SFC<IStaticCreativesGuidelinesProps> = (props) => {
  const { onTitleInit } = props;
  return (
    <Article>
      <PageSection>
        <Title
          level={2}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
          text={localizeString('Overview')} />
        <p>
          A static campaign image is superimposed on the user’s profile picture. The user can drag and zoom their
          portrait to adjust the resulting image before posting it. Use a <b>1200 × 1200 px</b> image
          in <b>PNG</b> format for the best results at any screen resolution on all devices.
        </p>
        <p>
          Refer to the following files for detailed information:
        </p>
        <LinksGrid>
          <LinksGridItem
            attach="https://mnfst-static.s3.amazonaws.com/merchant/Creative_Static.sketch"
            className="grid-columns-6"
            dockTo="right"
            icon={FileTypes.sketch.icon}
            title="Get Sketch File" />
          <LinksGridItem
            attach="https://mnfst-static.s3.amazonaws.com/merchant/Creative_Static.psd"
            className="grid-columns-6"
            icon={FileTypes.psd.icon}
            title="Get Photoshop File" />
        </LinksGrid>
      </PageSection>
      <PageSection>
        <Title
          level={2}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
          text={localizeString('Image resizing')} />
        <p>
          When the user joins your campaign, the image is posted as a separate post or tweet in the user’s social
          network. It appears as a full-sized square photo, and this post generates most eyeballs. Elsewhere on
          the social network (for instance, in other posts or comments) the profile picture appears in a smaller
          format, often cropped to a circular shape, thus making your campaign image less visible and recognizable.{' '}
          <strong>
            That’s why we strongly recommend designing your image in the square shape, since it’s the most
            important and viewed format for your campaign.
          </strong>
        </p>
        <p>
          Please refer to the charts below to see how your image appears throughout specific social networks:
        </p>
      </PageSection>
      {ALLOWED_SOCIAL_NETWORKS.includes('facebook') && (
        <PageSection level="2">
          <ScreenshotPreview
            preview={facebookStaticSizesImage}
            image={facebookStaticSizesImage}
            onInit={({ element }) => onTitleInit && onTitleInit({ element, level: 2, text: 'Facebook' })}
            title="Facebook" />
        </PageSection>
      )}
      {ALLOWED_SOCIAL_NETWORKS.includes('instagram') && (
        <PageSection level="2">
          <ScreenshotPreview
            preview={instagramStaticSizesImage}
            image={instagramStaticSizesImage}
            onInit={({ element }) => onTitleInit && onTitleInit({ element, level: 2, text: 'Instagram' })}
            title="Instagram" />
        </PageSection>
      )}
      {ALLOWED_SOCIAL_NETWORKS.includes('twitter') && (
        <PageSection level="2">
          <ScreenshotPreview
            preview={twitterStaticSizesImage}
            image={twitterStaticSizesImage}
            onInit={({ element }) => onTitleInit && onTitleInit({ element, level: 2, text: 'Twitter' })}
            title="Twitter" />
        </PageSection>
      )}
      <PageSection>
        <Title
          level={2}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
          text={localizeString('Content restrictions')} />
        <p>
          There are certain limitations on what can be promoted via MNFST and what kind of visual imagery can be used.
          Three most important rules:
        </p>
        <ul>
          <li><strong>No political campaigns.</strong></li>
          <li><strong>No religious campaigns.</strong></li>
          <li><strong>No content in violation of social networks’ rules.</strong></li>
        </ul>
        <p>
          This generally exclude any sexually explicit and pornographic images, copyright infringement, graphic
          violence, sharing private information, promoting self-harm and any forms of criminal activity, supporting
          illegal organizations, bullying and harassment, defamation and attacks on public figures.
        </p>
        <p>
          Refer to the following documents for detailed information:
        </p>
        <LinksGrid>
          {ALLOWED_SOCIAL_NETWORKS.includes('facebook')
            ? (
              <LinksGridItem
                className="grid-columns-6"
                dockTo="bottom-right"
                href="https://facebook.com/communitystandards"
                icon={SocialNetworks.facebook.icon}
                title="Facebook"
                subtitle="Community Standards" />
            )
            : (
              <LinksGridItem
                className="grid-columns-6"
                dockTo="bottom-right"
                icon={<span />}
                title="Guides:" />
            )}
          {ALLOWED_SOCIAL_NETWORKS.includes('twitter')
            ? (
              <LinksGridItem
                className="grid-columns-6"
                dockTo="bottom-left"
                href="https://help.twitter.com/en/rules-and-policies"
                icon={SocialNetworks.twitter.icon}
                title="The Twitter"
                subtitle="Rules &amp; Policies" />
            )
            : (
              <LinksGridItem
                className="grid-columns-6"
                dockTo="bottom-right"
                icon={<span />}
                title="" />
            )}
          {ALLOWED_SOCIAL_NETWORKS.includes('instagram')
            ? (
              <LinksGridItem
                className="grid-columns-6"
                dockTo="top-right"
                href="https://help.instagram.com/477434105621119"
                icon={SocialNetworks.instagram.icon}
                title="Instagram"
                subtitle="Community Guidelines" />
            )
            : (
              <LinksGridItem
                className="grid-columns-6"
                dockTo="bottom-right"
                icon={<span />}
                title="" />
            )}
          <LinksGridItem
            className="grid-columns-6"
            dockTo="top-left"
            href="https://mnfst.com/license/"
            title="MNFST Advertising"
            subtitle="Services Agreement" />
        </LinksGrid>
      </PageSection>
    </Article>
  );
};

export default StaticCreativesGuidelines;
