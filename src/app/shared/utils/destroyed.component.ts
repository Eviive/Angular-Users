import { DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MonoTypeOperatorFunction } from "rxjs";

export abstract class Destroyed {

    private readonly destroyRef = inject(DestroyRef);

    protected untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
        return takeUntilDestroyed<T>(this.destroyRef);
    }

}
