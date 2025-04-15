'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">galsen-medic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' : 'data-bs-target="#xs-controllers-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' :
                                            'id="xs-controllers-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DeviseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeviseController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DisponibiliteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisponibiliteController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PaiementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaiementController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StatutReservationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatutReservationController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TarifController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TarifController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' : 'data-bs-target="#xs-injectables-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' :
                                        'id="xs-injectables-links-module-AppModule-def60096967c2c0cae12f1ad6a425a4d2d326c00d52a0cfc27a3a7a0cc27ee642d2da22f795b0cba258eb9f186fef10e2d14e9a8d02432a878d89a7070de9afd"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeviseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeviseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DisponibiliteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisponibiliteService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaiementNabooService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaiementNabooService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaiementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaiementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StatutReservationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatutReservationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TarifService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TarifService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' :
                                            'id="xs-controllers-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' :
                                        'id="xs-injectables-links-module-AuthModule-58b9559abc88e1c2eee64482d72a25a6588b02af96012a644da245dd086eae5360da8d4523f2b010b53cc2b0980ee884858fff7f52ad3192b9992ceaff624682"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BlacklistService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlacklistService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UtilisateurService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateurService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DisponibiliteModule.html" data-type="entity-link" >DisponibiliteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' : 'data-bs-target="#xs-controllers-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' :
                                            'id="xs-controllers-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' }>
                                            <li class="link">
                                                <a href="controllers/DisponibiliteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisponibiliteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' : 'data-bs-target="#xs-injectables-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' :
                                        'id="xs-injectables-links-module-DisponibiliteModule-a0bef3fef16db1d2c4901f13fcdbbf42196e00b0eb6ba91c4119410617d7278574c17164856fec010715ea5a2e5c87bd72c21561a74b12979206efd3a44afdc1"' }>
                                        <li class="link">
                                            <a href="injectables/DisponibiliteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisponibiliteService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogModule.html" data-type="entity-link" >LogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' : 'data-bs-target="#xs-controllers-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' :
                                            'id="xs-controllers-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' }>
                                            <li class="link">
                                                <a href="controllers/LogController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' : 'data-bs-target="#xs-injectables-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' :
                                        'id="xs-injectables-links-module-LogModule-b23535fb35b6a676453c76db33ea651dfcc615110c9d0c9b11de97e0f6aadc21ade95a49a97180b028df6bfa373a780545ead1ef46ae98ccf2d8930ff2c4890b"' }>
                                        <li class="link">
                                            <a href="injectables/LogListener.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogListener</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MedecinSousserviceModule.html" data-type="entity-link" >MedecinSousserviceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' : 'data-bs-target="#xs-controllers-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' :
                                            'id="xs-controllers-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' }>
                                            <li class="link">
                                                <a href="controllers/MedecinSousServiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedecinSousServiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' : 'data-bs-target="#xs-injectables-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' :
                                        'id="xs-injectables-links-module-MedecinSousserviceModule-01af09f22924a79b7fff7db0b85ce21f9125eb51b6599554d7a1afd8d725a20d5e20cb4c1493613c9130a631bba770de595a5730460f9a297c0b6faac67b5eb6"' }>
                                        <li class="link">
                                            <a href="injectables/MedecinSousServiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedecinSousServiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModePaiementModule.html" data-type="entity-link" >ModePaiementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' : 'data-bs-target="#xs-controllers-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' :
                                            'id="xs-controllers-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' }>
                                            <li class="link">
                                                <a href="controllers/ModePaiementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModePaiementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' : 'data-bs-target="#xs-injectables-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' :
                                        'id="xs-injectables-links-module-ModePaiementModule-643e53651c16cb3d6dfe054fedba7391ac94504643240e85ab2b37502cda440463bd63768882ca06c97b055a7bf0fda183f21efc1b30648702abe50e0bc8e898"' }>
                                        <li class="link">
                                            <a href="injectables/ModePaiementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModePaiementService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaiementModule.html" data-type="entity-link" >PaiementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' : 'data-bs-target="#xs-controllers-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' :
                                            'id="xs-controllers-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' }>
                                            <li class="link">
                                                <a href="controllers/PaiementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaiementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' : 'data-bs-target="#xs-injectables-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' :
                                        'id="xs-injectables-links-module-PaiementModule-2deae532c2704ce26cce3bdbbf0472ba7b7a5d82cfc13ebc222fa18a30b633e306365ed679c6b3aaa4f7bf6abee897c0cb94c376a286cf5db985c879014ce855"' }>
                                        <li class="link">
                                            <a href="injectables/PaiementNabooService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaiementNabooService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaiementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaiementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-fc1fe81ea351cfa9da26e7a635e40221297f4a1a2595f24ad30e79fd479fc4fe9c66237d2347338a7fd7c2087d1ee66dea4eee41996b90aad474b6cec59e028d"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-fc1fe81ea351cfa9da26e7a635e40221297f4a1a2595f24ad30e79fd479fc4fe9c66237d2347338a7fd7c2087d1ee66dea4eee41996b90aad474b6cec59e028d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-fc1fe81ea351cfa9da26e7a635e40221297f4a1a2595f24ad30e79fd479fc4fe9c66237d2347338a7fd7c2087d1ee66dea4eee41996b90aad474b6cec59e028d"' :
                                        'id="xs-injectables-links-module-PrismaModule-fc1fe81ea351cfa9da26e7a635e40221297f4a1a2595f24ad30e79fd479fc4fe9c66237d2347338a7fd7c2087d1ee66dea4eee41996b90aad474b6cec59e028d"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivilegeModule.html" data-type="entity-link" >PrivilegeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' : 'data-bs-target="#xs-controllers-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' :
                                            'id="xs-controllers-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' }>
                                            <li class="link">
                                                <a href="controllers/PrivilegeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivilegeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' : 'data-bs-target="#xs-injectables-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' :
                                        'id="xs-injectables-links-module-PrivilegeModule-26c21c6b7efe12cd7d2b162637a0977c786e9defde215777e9194cd9bbe427b20d22f4619fd4b96bea713991a06b876d410de9e9ebfade12524873a939a01281"' }>
                                        <li class="link">
                                            <a href="injectables/PrivilegeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivilegeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservationModule.html" data-type="entity-link" >ReservationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' : 'data-bs-target="#xs-controllers-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' :
                                            'id="xs-controllers-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' }>
                                            <li class="link">
                                                <a href="controllers/ReservationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' : 'data-bs-target="#xs-injectables-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' :
                                        'id="xs-injectables-links-module-ReservationModule-37a2c1d82c196512fe48ce872966b555ba7ba0d66d0832db29b6eef9ec52ebb9b593fa74ec707cf93bb74d5e9bc27a63da1d65a25f6bf5248b11cacabb27b190"' }>
                                        <li class="link">
                                            <a href="injectables/CloudinaryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReservationDocumentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationDocumentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReservationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServiceModule.html" data-type="entity-link" >ServiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' : 'data-bs-target="#xs-controllers-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' :
                                            'id="xs-controllers-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' }>
                                            <li class="link">
                                                <a href="controllers/ServiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' : 'data-bs-target="#xs-injectables-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' :
                                        'id="xs-injectables-links-module-ServiceModule-fd61f60d32e891cbdf0cf06c5f17af4042d5d5981123564cdba7bf12930cddf1add02f945f9cd6d77614a5dddc3c8ed975fcb5e8c5f5ec793cd163dde53a026b"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SousServiceModule.html" data-type="entity-link" >SousServiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' : 'data-bs-target="#xs-controllers-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' :
                                            'id="xs-controllers-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' }>
                                            <li class="link">
                                                <a href="controllers/SousServiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SousServiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' : 'data-bs-target="#xs-injectables-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' :
                                        'id="xs-injectables-links-module-SousServiceModule-b31b531443d24f42c4af5f104a9c1aa69279e5d50ca07f418e5266246bc6d99653ae80808d9cd049388c11cd0ec0242ad30ed7d055b20bd092cdd3f3cb537a8d"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SousServiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SousServiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatutReservationModule.html" data-type="entity-link" >StatutReservationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' : 'data-bs-target="#xs-controllers-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' :
                                            'id="xs-controllers-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' }>
                                            <li class="link">
                                                <a href="controllers/StatutReservationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatutReservationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' : 'data-bs-target="#xs-injectables-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' :
                                        'id="xs-injectables-links-module-StatutReservationModule-51cb848652bdedd5dfee48cfa13b029605edb92d07c58da3411de9c9076799447f47f8df14abb704a2d87f7f02d5edaa75ec1f23346c7e99fd6af5d0a1c0869a"' }>
                                        <li class="link">
                                            <a href="injectables/StatutReservationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatutReservationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TarifModule.html" data-type="entity-link" >TarifModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' : 'data-bs-target="#xs-controllers-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' :
                                            'id="xs-controllers-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' }>
                                            <li class="link">
                                                <a href="controllers/TarifController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TarifController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' : 'data-bs-target="#xs-injectables-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' :
                                        'id="xs-injectables-links-module-TarifModule-c72dd22bc06657319fb301a2c254f4948d75bd0d2f225654f2c3c49f6d51dde83dda9522350b573197791156dab822fc57f63d1af7faa873475310f0edda7192"' }>
                                        <li class="link">
                                            <a href="injectables/TarifService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TarifService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadModule-ce003ea2e8c9adae94252847c85ba94a922f6cf7593a6a70ebea6a458245a8502dc6c7eb1845281b7cf6d87941aa291e10ab6d4b43df7578354d52295151f459"' : 'data-bs-target="#xs-injectables-links-module-UploadModule-ce003ea2e8c9adae94252847c85ba94a922f6cf7593a6a70ebea6a458245a8502dc6c7eb1845281b7cf6d87941aa291e10ab6d4b43df7578354d52295151f459"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-ce003ea2e8c9adae94252847c85ba94a922f6cf7593a6a70ebea6a458245a8502dc6c7eb1845281b7cf6d87941aa291e10ab6d4b43df7578354d52295151f459"' :
                                        'id="xs-injectables-links-module-UploadModule-ce003ea2e8c9adae94252847c85ba94a922f6cf7593a6a70ebea6a458245a8502dc6c7eb1845281b7cf6d87941aa291e10ab6d4b43df7578354d52295151f459"' }>
                                        <li class="link">
                                            <a href="injectables/CloudinaryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilisateurModule.html" data-type="entity-link" >UtilisateurModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' : 'data-bs-target="#xs-controllers-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' :
                                            'id="xs-controllers-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' }>
                                            <li class="link">
                                                <a href="controllers/UtilisateurController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateurController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' : 'data-bs-target="#xs-injectables-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' :
                                        'id="xs-injectables-links-module-UtilisateurModule-b746d714e493c7004c1a3d0f41367ad39b8d362180611e04c4e391128824f08dc74333f2effd415f9b60a852ddc0e0c0c6cbd2aa43a221f29fe2d0c7d22a8c5a"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UtilisateurService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateurService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ValidationModule.html" data-type="entity-link" >ValidationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ValidationModule-555497666335621860022c949a601d457203c2214233767820967c40e97cf6ecb4914534f8f09a54ad236c6533085ee4601a8f169569089d11a5100798181cfd"' : 'data-bs-target="#xs-injectables-links-module-ValidationModule-555497666335621860022c949a601d457203c2214233767820967c40e97cf6ecb4914534f8f09a54ad236c6533085ee4601a8f169569089d11a5100798181cfd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ValidationModule-555497666335621860022c949a601d457203c2214233767820967c40e97cf6ecb4914534f8f09a54ad236c6533085ee4601a8f169569089d11a5100798181cfd"' :
                                        'id="xs-injectables-links-module-ValidationModule-555497666335621860022c949a601d457203c2214233767820967c40e97cf6ecb4914534f8f09a54ad236c6533085ee4601a8f169569089d11a5100798181cfd"' }>
                                        <li class="link">
                                            <a href="injectables/ExceptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExceptionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePrivilegeDto.html" data-type="entity-link" >ChangePrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectDeviseDto.html" data-type="entity-link" >ConnectDeviseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectDisponibiliteDto.html" data-type="entity-link" >ConnectDisponibiliteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectDossierMedicalDto.html" data-type="entity-link" >ConnectDossierMedicalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectLogDto.html" data-type="entity-link" >ConnectLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectMedecinSousServiceDto.html" data-type="entity-link" >ConnectMedecinSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectModePaiementDto.html" data-type="entity-link" >ConnectModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectOrdonnanceDto.html" data-type="entity-link" >ConnectOrdonnanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectPaiementDto.html" data-type="entity-link" >ConnectPaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectPrivilegeDto.html" data-type="entity-link" >ConnectPrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectReservationDto.html" data-type="entity-link" >ConnectReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectServiceDto.html" data-type="entity-link" >ConnectServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectSousServiceDto.html" data-type="entity-link" >ConnectSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectStatutReservationDto.html" data-type="entity-link" >ConnectStatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectTarifDto.html" data-type="entity-link" >ConnectTarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectUtilisateurDto.html" data-type="entity-link" >ConnectUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectUtilisateurDto-1.html" data-type="entity-link" >ConnectUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDeviseDto.html" data-type="entity-link" >CreateDeviseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDeviseDto-1.html" data-type="entity-link" >CreateDeviseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDisponibiliteDto.html" data-type="entity-link" >CreateDisponibiliteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDisponibiliteDto-1.html" data-type="entity-link" >CreateDisponibiliteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDossierMedicalDto.html" data-type="entity-link" >CreateDossierMedicalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLogDto.html" data-type="entity-link" >CreateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMedecinSousServiceDto.html" data-type="entity-link" >CreateMedecinSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMedecinSousServiceDto-1.html" data-type="entity-link" >CreateMedecinSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateModePaiementDto.html" data-type="entity-link" >CreateModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateModePaiementDto-1.html" data-type="entity-link" >CreateModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrdonnanceDto.html" data-type="entity-link" >CreateOrdonnanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaiementDto.html" data-type="entity-link" >CreatePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaiementDto-1.html" data-type="entity-link" >CreatePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaiementNabooDto.html" data-type="entity-link" >CreatePaiementNabooDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePrivilegeDto.html" data-type="entity-link" >CreatePrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePrivilegeDto-1.html" data-type="entity-link" >CreatePrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationDto.html" data-type="entity-link" >CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationDto-1.html" data-type="entity-link" >CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateServiceDto.html" data-type="entity-link" >CreateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateServiceDto-1.html" data-type="entity-link" >CreateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSousServiceDto.html" data-type="entity-link" >CreateSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSousServiceDto-1.html" data-type="entity-link" >CreateSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStatutReservationDto.html" data-type="entity-link" >CreateStatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStatutReservationDto-1.html" data-type="entity-link" >CreateStatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTarifDto.html" data-type="entity-link" >CreateTarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTarifDto-1.html" data-type="entity-link" >CreateTarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUtilisateurDto.html" data-type="entity-link" >CreateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUtilisateurDto-1.html" data-type="entity-link" >CreateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Devise.html" data-type="entity-link" >Devise</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviseDto.html" data-type="entity-link" >DeviseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Disponibilite.html" data-type="entity-link" >Disponibilite</a>
                            </li>
                            <li class="link">
                                <a href="classes/DisponibiliteDto.html" data-type="entity-link" >DisponibiliteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DossierMedical.html" data-type="entity-link" >DossierMedical</a>
                            </li>
                            <li class="link">
                                <a href="classes/DossierMedicalDto.html" data-type="entity-link" >DossierMedicalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindPrivilegeDto.html" data-type="entity-link" >FindPrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUtilisateurDto.html" data-type="entity-link" >FindUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Log.html" data-type="entity-link" >Log</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogDto.html" data-type="entity-link" >LogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MedecinSousService.html" data-type="entity-link" >MedecinSousService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MedecinSousServiceDto.html" data-type="entity-link" >MedecinSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModePaiement.html" data-type="entity-link" >ModePaiement</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModePaiementDto.html" data-type="entity-link" >ModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ordonnance.html" data-type="entity-link" >Ordonnance</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrdonnanceDto.html" data-type="entity-link" >OrdonnanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Paiement.html" data-type="entity-link" >Paiement</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaiementDto.html" data-type="entity-link" >PaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Privilege.html" data-type="entity-link" >Privilege</a>
                            </li>
                            <li class="link">
                                <a href="classes/Privilege-1.html" data-type="entity-link" >Privilege</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrivilegeDto.html" data-type="entity-link" >PrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reservation.html" data-type="entity-link" >Reservation</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReservationDto.html" data-type="entity-link" >ReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Service.html" data-type="entity-link" >Service</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServiceDto.html" data-type="entity-link" >ServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SousService.html" data-type="entity-link" >SousService</a>
                            </li>
                            <li class="link">
                                <a href="classes/SousServiceDto.html" data-type="entity-link" >SousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatutReservation.html" data-type="entity-link" >StatutReservation</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatutReservationDto.html" data-type="entity-link" >StatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tarif.html" data-type="entity-link" >Tarif</a>
                            </li>
                            <li class="link">
                                <a href="classes/TarifDto.html" data-type="entity-link" >TarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDeviseDto.html" data-type="entity-link" >UpdateDeviseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDeviseDto-1.html" data-type="entity-link" >UpdateDeviseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDisponibiliteDto.html" data-type="entity-link" >UpdateDisponibiliteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDisponibiliteDto-1.html" data-type="entity-link" >UpdateDisponibiliteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDossierMedicalDto.html" data-type="entity-link" >UpdateDossierMedicalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLogDto.html" data-type="entity-link" >UpdateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMedecinSousServiceDto.html" data-type="entity-link" >UpdateMedecinSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMedecinSousServiceDto-1.html" data-type="entity-link" >UpdateMedecinSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateModePaiementDto.html" data-type="entity-link" >UpdateModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateModePaiementDto-1.html" data-type="entity-link" >UpdateModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrdonnanceDto.html" data-type="entity-link" >UpdateOrdonnanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaiementDto.html" data-type="entity-link" >UpdatePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaiementDto-1.html" data-type="entity-link" >UpdatePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePrivilegeDto.html" data-type="entity-link" >UpdatePrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePrivilegeDto-1.html" data-type="entity-link" >UpdatePrivilegeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReservationDto.html" data-type="entity-link" >UpdateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReservationDto-1.html" data-type="entity-link" >UpdateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateServiceDto.html" data-type="entity-link" >UpdateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateServiceDto-1.html" data-type="entity-link" >UpdateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSousServiceDto.html" data-type="entity-link" >UpdateSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSousServiceDto-1.html" data-type="entity-link" >UpdateSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStatutReservationDto.html" data-type="entity-link" >UpdateStatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStatutReservationDto-1.html" data-type="entity-link" >UpdateStatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTarifDto.html" data-type="entity-link" >UpdateTarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTarifDto-1.html" data-type="entity-link" >UpdateTarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUtilisateurDto.html" data-type="entity-link" >UpdateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUtilisateurDto-1.html" data-type="entity-link" >UpdateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utilisateur.html" data-type="entity-link" >Utilisateur</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utilisateur-1.html" data-type="entity-link" >Utilisateur</a>
                            </li>
                            <li class="link">
                                <a href="classes/UtilisateurDto.html" data-type="entity-link" >UtilisateurDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AsyncContextInterceptor.html" data-type="entity-link" >AsyncContextInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AsyncContextMiddleware.html" data-type="entity-link" >AsyncContextMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OptionalJwtAuthGuard.html" data-type="entity-link" >OptionalJwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FileStorageService.html" data-type="entity-link" >FileStorageService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileUploadResult.html" data-type="entity-link" >FileUploadResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaiementResult.html" data-type="entity-link" >IPaiementResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});