import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withRouterConfig, withViewTransitions } from '@angular/router';
import { routes } from '@app/app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withRouterConfig({
                paramsInheritanceStrategy: 'always'
            }),
            withComponentInputBinding(),
            withViewTransitions(),
            // withDebugTracing()
        ),
        provideAnimations(),
        provideHttpClient()
    ]
};
