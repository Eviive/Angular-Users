import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading, withRouterConfig, withViewTransitions } from '@angular/router';
import { routes } from '@app/app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withRouterConfig({
                paramsInheritanceStrategy: 'always'
            }),
            withComponentInputBinding(),
            withPreloading(PreloadAllModules),
            withViewTransitions(),
            // withDebugTracing()
        ),
        provideAnimations(),
        provideHttpClient()
    ]
};
