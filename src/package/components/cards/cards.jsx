import React, { useMemo } from 'react';

import { createUseStyles, useTheme } from 'react-jss';

import { BasicsCard } from './cards_types/basics/basics_card';
import { ProjectsCard } from './cards_types/projects/projects_card';
import { InterestedByCard } from './cards_types/interested_by/interested_by_card';
import { SoundtrackCard } from './cards_types/soundtrack/soundtrack_card';
import { StudiesCard } from './cards_types/studies/studies_card';
import { ExperiencesCard } from './cards_types/experiences/experiences_card';
import { SkillsCard } from './cards_types/skills/skills_card';
import { GifsCard } from './cards_types/gifs/gifs_card';
import { DreamJobCard } from './cards_types/dream_job/dream_job_card';
import { LanguagesCard } from './cards_types/languages/languages_card';

import { styles } from './cards_styles';
import { getRandomCardVariant } from '../../utils/styles/theme/theme';

const useStyles = createUseStyles(styles);
const DEFAULT_CARD_ORDER = [
    { type: 'basics', variant: 3 },
    { type: 'projects', variant: 4 },
    { type: 'language', variant: 3 },
    { type: 'dreamjob', variant: 4 },
    { type: 'gifs', variant: 2 },
    { type: 'experiences', variant: 4 },
    { type: 'studies', variant: 3 },
    { type: 'skills', variant: 0 },
    { type: 'soundtrack', variant: 0 },
    { type: 'interestedBy', variant: 2 }
];
const CARD_TYPE_MAPPING = {
    basics: BasicsCard,
    projects: ProjectsCard,
    language: LanguagesCard,
    dreamjob: DreamJobCard,
    gifs: GifsCard,
    experiences: ExperiencesCard,
    studies: StudiesCard,
    skills: SkillsCard,
    soundtrack: SoundtrackCard,
    interestedBy: InterestedByCard
};

const CardsComponent = ({ cardsOrder = DEFAULT_CARD_ORDER }) => {
    const theme = useTheme();
    const classes = useStyles();
    const cards = useMemo(
        () =>
            cardsOrder
                .map(({ type, variant }, index) => {
                    if (!CARD_TYPE_MAPPING[type]) {
                        return null;
                    }
                    return React.createElement(CARD_TYPE_MAPPING[type], {
                        variant: !Number.isNaN(Number(variant)) ? variant : getRandomCardVariant(theme),
                        key: `card_${type}_${index}`
                    });
                })
                .filter(Boolean),
        [cardsOrder]
    );
    return <div className={classes.container}>{cards}</div>;
};

export const Cards = CardsComponent;
