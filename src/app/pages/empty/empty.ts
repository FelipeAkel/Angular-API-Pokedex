import { Component } from '@angular/core';

@Component({
    selector: 'app-empty',
    standalone: true,
    template: ` <div class="card">
        <div class="font-semibold text-xl mb-4">Página em branco</div>
        <p>Use esta página para começar do zero e inserir seu conteúdo personalizado.</p>
    </div>`
})
export class Empty {}
