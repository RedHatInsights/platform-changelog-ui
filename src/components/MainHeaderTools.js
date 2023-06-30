import React from 'react';
import {
  Button,
  ButtonVariant,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem
} from '@patternfly/react-core';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import { css } from '@patternfly/react-styles';
import { BellIcon, CogIcon } from '@patternfly/react-icons';

import { DateFilter } from './filters';

export default function MainHeaderTools({ pathname }) {

    // Leaving the bell and cog icons in the header for later features
    // i.e. notifications from tracked services or monthly reports
    //      and user managing user favorites (a heart or star icon should be used)
    return (
        <PageHeaderTools>
            {pathname.includes('/commits') || pathname.includes('/deploys') ? 
                <DateFilter pathname={pathname} /> :
                <PageHeaderToolsGroup className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnLg)}>
                    <PageHeaderToolsItem id="notifications">
                        <Button id="simple-example-uid-01" aria-label="Notifications" variant={ButtonVariant.plain}>
                            <BellIcon/>
                        </Button>
                    </PageHeaderToolsItem>
                    <PageHeaderToolsItem id="settings">
                        <Button id="simple-example-uid-02" aria-label="Settings" variant={ButtonVariant.plain}>
                            <CogIcon/>
                        </Button>
                    </PageHeaderToolsItem>
                </PageHeaderToolsGroup>
            }
        </PageHeaderTools>
    );
}
