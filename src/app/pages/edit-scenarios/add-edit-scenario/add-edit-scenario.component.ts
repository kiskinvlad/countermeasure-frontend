import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';
import { Scenario } from '@app/shared/models/scenario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectScenarioState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { FetchScenario, DeleteScenario, UpdateScenario, CreateScenario } from '@app/shared/ngrx-store/actions/scenario.actions';
import { ComponentCanDeactivate } from '@app/shared/guard/auth-guard.service';

@Component({
  selector: 'ct-add-edit-scenario',
  templateUrl: './add-edit-scenario.component.html',
  styleUrls: ['./add-edit-scenario.component.scss']
})
/**
 * Add/Edit scenario component
 * @implements {OnInit, OnDestroy}
 */
export class AddEditScenarioComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
/**
 * @param {Observable<any>} getScenarioState$ Scenario state observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {ValidatorModule} validator Form validaor module param
 * @param {boolean} allowNavigate Allow user to navigate
 * @param {Scenario} scenario Current scenario object param
 * @param {number} case_id Current case id param
 * @param {string} type Component type param
 * @param {number} scenario_id Current scenario id param
 * @param {boolean} isFormTouched Form touched state param
 * @param {FormGroup} scenarioForm Scenario form param
 * @param {FormControl} name Form name control param
 * @param {FormControl} probability Form probability control param
 * @param {FormControl} description Form description control param
 * @param {FormControl} taxes Form taxes control param
 * @param {FormControl} taxable_income Form income control param
 * @param {FormControl} penalties Form penalties control param
 * @param {FormControl} interest Form interest control param
 */
  private getScenarioState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private formSubscription: Subscription;
  private validator: ValidatorModule;
  private allowNavigate: boolean;
  public scenario: Scenario;
  public case_id: number;
  public type: string;
  public scenario_id: number;
  public isFormTouched: boolean;
  public scenarioForm: FormGroup;
  public name: FormControl;
  public probability: FormControl;
  public description: FormControl;
  public taxable_income: FormControl;
  public taxes: FormControl;
  public penalties: FormControl;
  public interest: FormControl;
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} store App state store service
 * @param {Router} router  App router service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.isFormTouched = false;
      this.allowNavigate = true;
      this.getScenarioState$ = this.store.select(selectScenarioState);
  }
/**
 * Initialize add-edit-scenario component life cycle method
 */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.scenario_id = +params['scenario_id'];
      this.case_id = params['case_id'];
      this.type = params['type'];
      this.validator = new ValidatorModule();
      this.createFormControls();
      this.createForm();
      if (this.type === 'add') {
        this.router.navigate(['/case', this.case_id, 'scenarios', 'edit', 'add']);
      }
    });

    this.subscription = this.getScenarioState$.subscribe((scenario_state) => {
      this.errorMessage = scenario_state.errorMessage;
      this.scenario = (scenario_state.scenario || null);
      if (this.scenario) {
        this.setFormData();
       }
    });

    if (this.scenario_id) {
      const payload = {
        scenario_id: this.scenario_id,
      };
      this.getFormData(payload);
    } else {
      this.scenario = null;
      this.scenarioForm.reset();
    }

    this.formSubscription = this.scenarioForm.statusChanges.subscribe(() => {
      const controllersToCheck = [
        'name',
        'probability',
        'description',
        'taxable_income',
        'taxes',
        'penalties',
        'interest'
      ];
      controllersToCheck.forEach(ctrlName => {
        const ctrl = this.scenarioForm.get(ctrlName);
        if (ctrl.dirty || ctrl.touched) {
          this.isFormTouched = true;
          this.allowNavigate = false;
        }
      });
    });
  }
/**
 * Create form controls method
 */
  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
    ]);
    this.probability = new FormControl('', [
      Validators.required
    ]);
    this.description = new FormControl('', [
      Validators.required
    ]);
    this.taxable_income = new FormControl('', [
    ]);
    this.taxes = new FormControl('', [
    ]);
    this.penalties = new FormControl('', [
    ]);
    this.interest = new FormControl('', [
    ]);
  }
/**
 * Create form method
 */
  private createForm(): void {
    this.scenarioForm = new FormGroup({
      name: this.name,
      probability: this.probability,
      description: this.description,
      taxable_income: this.taxable_income,
      taxes: this.taxes,
      penalties: this.penalties,
      interest: this.interest
    });
  }
/**
 * Create form data method
 * @param {object} payload Http request data
 */
  private getFormData(payload: object): void {
    if (this.type === 'edit') {
      this.store.dispatch(new FetchScenario(payload));
    }
  }
/**
 * Set form data method
 */
  private setFormData(): void {
    this.name.setValue(this.scenario.name);
    this.probability.setValue(this.scenario.probability);
    this.description.setValue(this.scenario.description);
    this.taxable_income.setValue(this.scenario.taxable_income);
    this.taxes.setValue(this.scenario.taxes);
    this.penalties.setValue(this.scenario.penalties);
    this.interest.setValue(this.scenario.interest);
  }
/**
 * Delete scenario method
 */
  private deleteScenario(): void {
    const payload = {
      id: this.scenario_id,
      name: this.scenario.name,
      case_id: this.case_id
    };
    this.store.dispatch(new DeleteScenario(payload));
  }
/**
 * Add/update scenario method
 */
  private addUpdateScenario(): void {
    let payload;
    if (!this.scenarioForm.valid) {
      this.validator.validateFormFields(this.scenarioForm);
    } else {
      payload = {
        name: this.scenarioForm.get('name').value,
        probability:  this.scenarioForm.get('probability').value,
        description: this.scenarioForm.get('description').value,
        taxable_income: this.scenarioForm.get('taxable_income').value,
        taxes: this.scenarioForm.get('taxes').value,
        penalties: this.scenarioForm.get('penalties').value,
        interest: this.scenarioForm.get('interest').value,
        case_id: this.case_id
      };
    }
    if (this.scenario_id && this.scenarioForm.valid) {
      payload['scenario_id'] = this.scenario_id;
      this.store.dispatch(new UpdateScenario(payload));
    } else if (this.scenarioForm.valid) {
      this.store.dispatch(new CreateScenario(payload));
    }
  }
/**
 * Can deactivate method
 * @returns {Observable | boolean}
 * Allow or prevent user navigate without confirmation
 */
  @HostListener('window:beforeunload')
  public canDeactivate(): Observable<boolean> | boolean {
    return this.allowNavigate;
  }
/**
 * Destroy add-edit-scenario component life cycle method
 */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }

}
