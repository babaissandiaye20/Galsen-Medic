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
                                            'data-bs-target="#controllers-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' :
                                            'id="xs-controllers-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' :
                                        'id="xs-injectables-links-module-AppModule-6ef0584420c7f012e4b50ca66cad99073abf25021ef1935f5d00a33a9a33b71476bb6081bd597092329381eaa01e29d477fbf298e9c7c462f74a728d7a5c7504"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationService</a>
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
                                <a href="classes/CreateDeviseDto.html" data-type="entity-link" >CreateDeviseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDisponibiliteDto.html" data-type="entity-link" >CreateDisponibiliteDto</a>
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
                                <a href="classes/CreateModePaiementDto.html" data-type="entity-link" >CreateModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrdonnanceDto.html" data-type="entity-link" >CreateOrdonnanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaiementDto.html" data-type="entity-link" >CreatePaiementDto</a>
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
                                <a href="classes/CreateServiceDto.html" data-type="entity-link" >CreateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSousServiceDto.html" data-type="entity-link" >CreateSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStatutReservationDto.html" data-type="entity-link" >CreateStatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTarifDto.html" data-type="entity-link" >CreateTarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUtilisateurDto.html" data-type="entity-link" >CreateUtilisateurDto</a>
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
                                <a href="classes/UpdateDisponibiliteDto.html" data-type="entity-link" >UpdateDisponibiliteDto</a>
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
                                <a href="classes/UpdateModePaiementDto.html" data-type="entity-link" >UpdateModePaiementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrdonnanceDto.html" data-type="entity-link" >UpdateOrdonnanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaiementDto.html" data-type="entity-link" >UpdatePaiementDto</a>
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
                                <a href="classes/UpdateServiceDto.html" data-type="entity-link" >UpdateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSousServiceDto.html" data-type="entity-link" >UpdateSousServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStatutReservationDto.html" data-type="entity-link" >UpdateStatutReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTarifDto.html" data-type="entity-link" >UpdateTarifDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUtilisateurDto.html" data-type="entity-link" >UpdateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utilisateur.html" data-type="entity-link" >Utilisateur</a>
                            </li>
                            <li class="link">
                                <a href="classes/UtilisateurDto.html" data-type="entity-link" >UtilisateurDto</a>
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