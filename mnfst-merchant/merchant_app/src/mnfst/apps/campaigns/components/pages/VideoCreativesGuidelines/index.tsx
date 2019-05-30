import React from 'react';
import Article from 'apps/ui/components/Article';
import { PageSection } from 'apps/ui/components/Page';
import { LinksGrid, LinksGridItem } from 'apps/ui/components/LinksGrid';
import { localizeString } from 'utils/localization';
import FileTypes from 'apps/ui/components/FileTypes';
import ScreenshotPreview from 'apps/ui/components/ScreenshotPreview';
import Title from 'apps/ui/components/Title';
import facebookVideoSizesImage from './images/facebookVideoSizes.jpg';
import instagramVideoSizesImage from './images/instagramVideoSizes.jpg';
import twitterVideoSizesImage from './images/twitterVideoSizes.jpg';
import { GuidesNotes, GuidesNotesItem, GuidesNotesCode } from 'apps/ui/components/GuideNotes';
import { ALLOWED_SOCIAL_NETWORKS } from 'constants/campaigns';

interface IVideoCreativesGuidelinesProps {
  onTitleInit?: (params: any) => void;
}

const VideoCreativesGuidelines: React.SFC<IVideoCreativesGuidelinesProps> = (props) => {
  const { onTitleInit } = props;
  return (
    <Article>
      <PageSection>
        <Title
          level={2}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
          text={localizeString('Overview')} />
        <p>
          In a campaign video, the user’s original profile picture is combined with your animation or video sequence.
          The maximum length of a video is <b>7 seconds</b>. The clip starts with the user’s profile picture,
          followed by your sequence fading in for <b>5 sec</b>, and at the end it fades out back to the user’s
          portrait. The recommended length for a fade in/out animation is <b>150 msec</b>.
        </p>
        <p>
          Refer to the following files for detailed information:
        </p>
        <LinksGrid>
          <LinksGridItem
            attach="https://mnfst-static.s3.amazonaws.com/merchant/Creative_Video.psd"
            className="grid-columns-12"
            icon={FileTypes.psd.icon}
            title="Get Photoshop File" />
        </LinksGrid>
      </PageSection>
      <PageSection>
        <Title
          level={2}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
          text={localizeString('Image on the video cover')} />
        <p>
          For the opening and closing frames of the video, we recommend superimposing the key campaign image on the
          user’s profile picture. This way, your video cover can serve as a static campaign image even if the clip is
          not played.
        </p>
      </PageSection>
      <PageSection>
        <Title
          level={2}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
          text={localizeString('Uploading video')} />
        <p>
          Save your video in any format that supports an alpha channel (select Premultiplied with black in Render
          options). For the best results, we recommend making a 1080 x 1080 px video in MOV format.
          Before uploading the video, you need to compile video and alpha channels alongside each other in one file.
          Please follow the instructions below.
        </p>
      </PageSection>
      <PageSection level="2">
        <Title
          level={4}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 2 })}
          text={localizeString('On Mac')} />
        <GuidesNotes>
          <GuidesNotesItem order={1}>
            Open <strong>Terminal</strong>
          </GuidesNotesItem>
          <GuidesNotesItem order={2}>
            Install <a href="https://docs.brew.sh/Installation"><strong>Homebrew</strong></a>
          </GuidesNotesItem>
          <GuidesNotesItem order={3}>
            After Homebrew installation is complete, paste this at the Terminal prompt:
          </GuidesNotesItem>
          <GuidesNotesCode>
            brew install ffmpeg --with-libass --with-openjpeg --with-openssl --with-webp --with-libvorbis
            --with-libvpx --with-theora
          </GuidesNotesCode>
          <GuidesNotesItem order={4}>
            After FFmpeg framework is installed, use the following code to create a compilation:
          </GuidesNotesItem>
          <GuidesNotesCode caption="This extracts alpha channel from the original file">
            ffmpeg -y -i <b>"Campaign/YourCampaignVideo.mov"</b> -an -vf alphaextract,format=yuv420p{' '}
            <b>"Campaign/alpha_channel.mp4"</b>
          </GuidesNotesCode>
          <GuidesNotesCode caption="This extracts alpha channel from the original file">
            ffmpeg -y -i <b>"Campaign/YourCampaignVideo.mov"</b> –an <b>"Campaign/video_channel.mp4"</b>
          </GuidesNotesCode>
          <GuidesNotesCode caption="This compiles video and alpha channels together">
            ffmpeg -y -i <b>"Campaign/video_channel.mp4"</b> -an -vf pad="2*iw:ih [left]; movie=
            <b>"Campaign/alpha_channel.mp4"</b>
            [right]; [left][right] overlay=main_w/2:0" -b:v 768k <b>"Campaign/combined_channels.mp4"</b>
          </GuidesNotesCode>
          <GuidesNotesItem order={5}>
            Upload the resulting file <b>combined_channels.mp4</b> in the Design section on the
            Create New Campaign screen.
          </GuidesNotesItem>
        </GuidesNotes>
      </PageSection>
      <PageSection level="2">
        <Title
          level={4}
          onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 2 })}
          text={localizeString('On Windows')} />
        <GuidesNotes>
          <GuidesNotesItem order={1}>
            Install <a href="https://www.ffmpeg.org/download.html"><strong>FFmpeg Build</strong></a>
          </GuidesNotesItem>
          <GuidesNotesItem order={2}>
            After FFmpeg codecs are installed, open <strong>Command Prompt</strong> and use the following code
            to create a compilation:
          </GuidesNotesItem>
          <GuidesNotesCode caption="This extracts alpha channel from the original file">
            ffmpeg -y -i <b>"Desktop/YourCampaignVideo.mov"</b> -an -vf alphaextract,format=yuv420p{' '}
            <b>"Desktop/alpha_channel.mp4"</b>
          </GuidesNotesCode>
          <GuidesNotesCode caption="This extracts alpha channel from the original file">
            ffmpeg -y -i <b>"Desktop/YourCampaignVideo.mov"</b> –an <b>"Desktop/video_channel.mp4"</b>
          </GuidesNotesCode>
          <GuidesNotesCode caption="This compiles video and alpha channels together">
            ffmpeg -y -i <b>"Desktop/video_channel.mp4"</b> -an -vf pad="2*iw:ih [left]; movie=
            <b>"Desktop/alpha_channel.mp4"</b> [right];
            [left][right] overlay=main_w/2:0" -b:v 768k <b>"Desktop/combined_channels.mp4"</b>
          </GuidesNotesCode>
          <GuidesNotesItem order={3}>
            Upload the resulting file <b>combined_channels.mp4</b> in the Design section on
            the Create New Campaign screen.
          </GuidesNotesItem>
        </GuidesNotes>
      </PageSection>
      {ALLOWED_SOCIAL_NETWORKS.includes('facebook') && (
        <PageSection>
          <Title
            level={2}
            onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
            text={localizeString('Facebook')} />
          <p>
            Profile videos are looped and play automatically everywhere they appear on Facebook. Some browsers and
            extensions are blocking auto-play, and the opening frame of the video is shown as a static profile picture
            with a ‘play’ button instead.
          </p>
          <p>
            The profile video is shown in its original square format when viewed in the campaign post in News Feed,
            which generate most eyeballs. Elsewhere on Facebook, the profile video is smaller and often cropped to
            a circular shape. That’s why we strongly recommend making your video in the square format, since it’s the
            most important and viewed format for your campaign.
          </p>
          <ScreenshotPreview
            preview={facebookVideoSizesImage}
            image={facebookVideoSizesImage}
            title="Facebook video view formats" />
        </PageSection>
      )}
      {ALLOWED_SOCIAL_NETWORKS.includes('instagram') && (
        <PageSection>
          <Title
            level={2}
            onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
            text={localizeString('Instagram')} />
          <p>
            The campaign video is always posted in the square format and plays automatically.
          </p>
          <ScreenshotPreview
            preview={instagramVideoSizesImage}
            image={instagramVideoSizesImage}
            title="Instagram video view formats" />
        </PageSection>
      )}
      {ALLOWED_SOCIAL_NETWORKS.includes('twitter') && (
        <PageSection>
          <Title
            level={2}
            onInit={({ element, text }) => onTitleInit && onTitleInit({ element, text, level: 1 })}
            text={localizeString('Twitter')} />
          <p>
            The campaign video on Twitter is posted directly to feed. MNFST automatically adds transparent sidebars to
            adapt your square video to a default Twitter rectangular viewport.
          </p>
          <ScreenshotPreview
            preview={twitterVideoSizesImage}
            image={twitterVideoSizesImage}
            title="Twitter video view formats" />
        </PageSection>
      )}
    </Article>
  );
};

export default VideoCreativesGuidelines;
