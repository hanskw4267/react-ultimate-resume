import React from 'react';

import { createUseStyles } from 'react-jss';

import { FormattedMessage } from 'react-intl';
import { CenterContentContainer } from '../../../../commons/center_content_container/center_content_container';
import { ProfileCardFrontTypography } from '../../../../commons/profile_card/profile_card_front_typography/profile_card_front_typography';
import { ProfileCardActions } from '../../../../commons/profile_card/profile_card_actions/profile_card_actions';
import { ProfileCardButton } from '../../../../commons/profile_card/profile_card_button/profile_card_button';

import { styles } from './languages_front_styles';

const useStyles = createUseStyles(styles);

const LanguagesFrontComponent = ({ variant }) => {
    const classes = useStyles();
    const languagesNode = (
        <>
            English
            <br />
            Español
            <br />
            Français
        </>
    );
    return (
        <>
            <CenterContentContainer>
                <ProfileCardFrontTypography customClasses={{ container: classes.typography }}>
                    <FormattedMessage
                        id="Languages.front.content"
                        defaultMessage="I speak {languagesNode}"
                        values={{ languagesNode }}
                    />
                </ProfileCardFrontTypography>
            </CenterContentContainer>
            <ProfileCardActions>
                <ProfileCardButton cardVariant={variant}>
                    {'Languages level'}
                </ProfileCardButton>
            </ProfileCardActions>
        </>
    );
};

export const LanguagesFront = LanguagesFrontComponent;