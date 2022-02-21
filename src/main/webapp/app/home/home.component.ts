import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { GlobalConstants } from 'app/home/globales';
import { ParametroService } from 'app/entities/parametro/parametro.service';
import { createNoSubstitutionTemplateLiteral } from 'typescript';
import { IParametro } from 'app/entities/parametro/parametro.model';
import { ConsoleLogger } from '@angular/compiler-cli/private/localize';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  public autenticado: boolean | undefined;

  private readonly destroy$ = new Subject<void>();
  private listaParametros: IParametro[] | undefined;

  constructor(private accountService: AccountService, private router: Router, private parametroService: ParametroService) {
    // this.autenticado = GlobalConstants.autenticado;
  }

  ngOnInit(): void {
    // Trae los parametros generales
    this.parametroService.traeParametro().subscribe({
      next: (resp: IParametro[]) => {
        this.listaParametros = resp;
        console.log(resp);
        GlobalConstants.URL_TyC = this.listaParametros.find(elem => elem.parametroId === 35)!.valor!;
        console.log('GlobalConstants.URL_TyC' + GlobalConstants.URL_TyC);
      },
      error: (err: any) => console.log(err),
    });

    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
    this.autenticado = this.account !== null;
    console.log(this.autenticado);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
