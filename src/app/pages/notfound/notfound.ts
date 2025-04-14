import { Component } from '@angular/core';

@Component({
    selector: 'app-notfound',
    standalone: true,
    template: ` <div class="card">
        <div class="font-semibold text-xl mb-4">Página não encontrada</div>
        <p>A página que tentou acessar não foi encontrada.</p>
    </div>`
})
export class Notfound {}
