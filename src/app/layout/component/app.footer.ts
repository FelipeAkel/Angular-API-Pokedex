import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Sistema <span class="text-link">v.1.0.0</span> | 
        Linkedin
        <a href="https://www.linkedin.com/in/felipe-akel-carvalho-florentino-009412135/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">
            Felipe Akel
        </a>
    </div>`
})
export class AppFooter {}
