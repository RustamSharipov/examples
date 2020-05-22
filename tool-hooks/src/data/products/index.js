import ppImage from './assets/pp.jpg';
import ppImageThumb from './assets/pp-thumb.png';
import ppMirrorlessImage from './assets/ppMirrorless.jpg';
import ppMirrorlessImageThumb from './assets/ppMirrorless-thumb.png';
import ppsImage from './assets/pps.jpg';
import ppsImageThumb from './assets/pps-thumb.png';
import ppsMirrorlessImage from './assets/ppsMirrorless.jpg';
import ppsMirrorlessImageThumb from './assets/ppsMirrorless-thumb.png';
import ppxImage from './assets/ppx.jpg';
import ppxImageThumb from './assets/ppx-thumb.png';
import ppxMirrorlessImage from './assets/ppxMirrorless.jpg';
import ppxMirrorlessImageThumb from './assets/ppxMirrorless-thumb.png';

const products = [
  {
    name: 'Pinhole Pro',
    description: 'Multi-aperture pinhole lens',
    codeName: 'pp',
    image: {
      src: ppImage,
      thumbSrc: ppImageThumb,
    },
    modifications: [
      {
        codeName: 'dslr',
        name: 'DSLR/SLR',
        image: {
          src: ppImage,
          thumbSrc: ppImageThumb,
        },
        specs: {
          focalLength: [55],
          fov: 40,
          weight: 170,
          diameter: 58,
          lensMount: ['EF', 'F', 'A', 'PK'],
          apertureType: 'Multi-Aperture',
        },
        exposure: [
          {
            pinholeSize: 0.1,
            fStop: 550,
          },
          {
            pinholeSize: 0.15,
            fStop: 367,
          },
          {
            pinholeSize: 0.2,
            fStop: 275,
          },
          {
            pinholeSize: 0.25,
            fStop: 220,
          },
          {
            pinholeSize: 0.3,
            fStop: 183,
          },
          {
            pinholeSize: 0.35,
            fStop: 157,
          },
          {
            pinholeSize: 0.5,
            fStop: 110,
          },
          {
            pinholeSize: 0.8,
            fStop: 69,
          },
        ],
        light: {
          cloudy: [
            {
              iso: 12800,
              shutterSpeed: '1/8',
            },
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
          ],
          indoor: [
            {
              iso: 12800,
              shutterSpeed: '1/4',
            },
            {
              iso: 12800,
              shutterSpeed: '1/8',
            },
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
            {
              iso: 6400,
              shutterSpeed: '1/15',
            },
            {
              iso: 6400,
              shutterSpeed: '1/15',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
          ],
          sunny: [
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
            {
              iso: 800,
              shutterSpeed: '1/60',
            },
          ],
        },
      },
      {
        codeName: 'mirrorless',
        name: 'Mirrorless',
        image: {
          src: ppMirrorlessImage,
          thumbSrc: ppMirrorlessImageThumb,
        },
        specs: {
          focalLength: [26],
          fov: 80,
          weight: 110,
          diameter: 58,
          lensMount: ['M4/3', 'X', 'E'],
          apertureType: 'Multi-Aperture',
        },
        exposure: [
          {
            pinholeSize: 0.1,
            fStop: 260,
          },
          {
            pinholeSize: 0.15,
            fStop: 173,
          },
          {
            pinholeSize: 0.2,
            fStop: 130,
          },
          {
            pinholeSize: 0.25,
            fStop: 104,
          },
          {
            pinholeSize: 0.3,
            fStop: 87,
          },
          {
            pinholeSize: 0.35,
            fStop: 74,
          },
          {
            pinholeSize: 0.5,
            fStop: 52,
          },
          {
            pinholeSize: 0.8,
            fStop: 32,
          },
        ],
        light: {
          cloudy: [
            {
              iso: 6400,
              shutterSpeed: '1/15',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
            {
              iso: 800,
              shutterSpeed: '1/125',
            },
          ],
          indoor: [
            {
              iso: 6400,
              shutterSpeed: '1/4',
            },
            {
              iso: 6400,
              shutterSpeed: '1/8',
            },
            {
              iso: 6400,
              shutterSpeed: '1/15',
            },
            {
              iso: 6400,
              shutterSpeed: '1/15',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 1600,
              shutterSpeed: '1/60',
            },
          ],
          sunny: [
            {
              iso: 3200,
              shutterSpeed: '1/15',
            },
            {
              iso: 3200,
              shutterSpeed: '1/30',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
            {
              iso: 1600,
              shutterSpeed: '1/125',
            },
            {
              iso: 400,
              shutterSpeed: '1/125',
            },
          ],
        },
      },
    ],
  },
  {
    name: 'Pinhole Pro S',
    description: 'Pinhole lens with variable focal length',
    codeName: 'pps',
    image: {
      src: ppsImage,
      thumbSrc: ppsImageThumb,
    },
    modifications: [
      {
        codeName: 'dslr',
        name: 'DSLR/SLR',
        image: {
          src: ppsImage,
          thumbSrc: ppsImageThumb,
        },
        specs: {
          focalLength: [37],
          fov: 60,
          weight: 110,
          diameter: 58,
          lensMount: ['EF', 'F', 'A', 'PK'],
          apertureType: 'Single-Aperture',
        },
        exposure: [
          {
            pinholeSIze: 0.26,
            fStop: 142,
          },
        ],
        light: {
          cloudy: [
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
          ],
          indoor: [
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
          ],
          sunny: [
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
          ],
        },
      },
      {
        codeName: 'mirrorless',
        name: 'Mirrorless',
        image: {
          src: ppsMirrorlessImage,
          thumbSrc: ppsMirrorlessImageThumb,
        },
        specs: {
          focalLength: [11],
          fov: 120,
          weight: 46,
          diameter: 58,
          lensMount: ['M4/3', 'X', 'E'],
          apertureType: 'Single-Aperture',
        },
        exposure: [
          {
            pinholeSize: 0.14,
            fStop: 79,
          },
        ],
        light: {
          cloudy: [
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
          ],
          indoor: [
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
          ],
          sunny: [
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
          ],
        },
      },
    ],
  },
  {
    name: 'Pinhole Pro X',
    description: 'Wide angle pinhole lens',
    codeName: 'ppx',
    image: {
      src: ppxImage,
      thumbSrc: ppxImageThumb,
    },
    modifications: [
      {
        codeName: 'dslr',
        name: 'DSLR/SLR',
        image: {
          src: ppxImage,
          thumbSrc: ppxImageThumb,
        },
        specs: {
          focalLength: [40, 60],
          fov: 72,
          weight: 153,
          diameter: 52,
          lensMount: ['EF', 'F', 'A', 'PK'],
          apertureType: 'Single-Aperture',
          apertureSize: [0.25],
        },
        exposure: [
          {
            focalLength: 40,
            fStop: 160,
          },
          {
            focalLength: 43,
            fStop: 172,
          },
          {
            focalLength: 45,
            fStop: 180,
          },
          {
            focalLength: 48,
            fStop: 192,
          },
          {
            focalLength: 50,
            fStop: 200,
          },
          {
            focalLength: 53,
            fStop: 212,
          },
          {
            focalLength: 55,
            fStop: 220,
          },
          {
            focalLength: 58,
            fStop: 232,
          },
          {
            focalLength: 60,
            fStop: 240,
          },
        ],
        light: {
          cloudy: [
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
          ],
          indoor: [
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
            {
              iso: 12800,
              shutterSpeed: '1/15',
            },
          ],
          sunny: [
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
          ],
        },
      },
      {
        codeName: 'mirrorless',
        name: 'Mirrorless',
        image: {
          src: ppxMirrorlessImage,
          thumbSrc: ppxMirrorlessImageThumb,
        },
        specs: {
          focalLength: [18, 36],
          fov: 81,
          weight: 110,
          diameter: 55,
          lensMount: ['M4/3', 'X', 'E'],
          apertureType: 'Single-Aperture',
          apertureSize: [0.25],
        },
        exposure: [
          {
            focalLength: 18,
            fStop: 72,
          },
          {
            focalLength: 20,
            fStop: 80,
          },
          {
            focalLength: 22,
            fStop: 88,
          },
          {
            focalLength: 24,
            fStop: 96,
          },
          {
            focalLength: 26,
            fStop: 104,
          },
          {
            focalLength: 28,
            fStop: 112,
          },
          {
            focalLength: 30,
            fStop: 120,
          },
          {
            focalLength: 32,
            fStop: 128,
          },
          {
            focalLength: 34,
            fStop: 136,
          },
          {
            focalLength: 36,
            fStop: 144,
          },
        ],
        light: {
          cloudy: [
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
            {
              iso: 6400,
              shutterSpeed: '1/125',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 12800,
              shutterSpeed: '1/60',
            },
          ],
          indoor: [
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 6400,
              shutterSpeed: '1/30',
            },
            {
              iso: 12800,
              shutterSpeed: '1/30',
            },
          ],
          sunny: [
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
            {
              iso: 3200,
              shutterSpeed: '1/125',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 3200,
              shutterSpeed: '1/60',
            },
            {
              iso: 6400,
              shutterSpeed: '1/60',
            },
          ],
        },
      },
    ],
  },
];

products.get = function(model, lensModification, lightType) {
  const product = this.find(item => item.codeName === model);

  if (!lensModification) {
    return product;
  }

  const modification = { ...product.modifications.find(item => item.codeName === lensModification) };

  if (!modification.specs.apertureSize) {
    modification.specs.apertureSize = modification.exposure.map(({ pinholeSize }) => pinholeSize);
  }

  if (lightType) {
    modification.light = modification.light[lightType];
  }

  modification.getSuggestions = (focalLength, pinholeSize) => {
    let index = 0;

    if (focalLength) {
      const focalLengthIndex = modification.exposure.map(({ focalLength }) => focalLength).indexOf(focalLength);
      index = focalLengthIndex > 0 ? focalLengthIndex : 0;
    }

    if (pinholeSize) {
      const pinholeSizeIndex = modification.exposure.map(({ pinholeSize }) => pinholeSize).indexOf(pinholeSize);
      index = pinholeSizeIndex > 0 ? pinholeSizeIndex : 0;
    }

    return {
      ...modification.light[index],
      fStop: modification.exposure[index].fStop,
    };
  };

  return {
    ...product,
    modification,
  };
};

products.getList = function() {
  return this.map(({ name, codeName, image, description }) => ({
    codeName,
    name,
    image,
    description,
  }));
};

export default products;
