import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
require('../../webparts/meter/custom.css')
import styles from './MeterWebPart.module.scss';
import * as strings from 'MeterWebPartStrings';

export interface IMeterWebPartProps {
  description: string;
  title: string;
  percentage: number;
}

export default class MeterWebPart extends BaseClientSideWebPart<IMeterWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `    
      
      <div class="flex-wrapper">
      <div class="single-chart">
      <h2>${this.properties.title}</h2>
        <svg viewBox="0 0 36 36" class="circular-chart orange">
          <path
            class="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            stroke-dasharray="30, 100"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" class="percentage">30%</text>
        </svg>
      </div>

      <div class="single-chart">
      <h2>${this.properties.title}</h2>
        <svg viewBox="0 0 36 36" class="circular-chart green">
          <path
            class="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            stroke-dasharray="75, 100"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" class="percentage">75%</text>
        </svg>
      </div>

      <div class="single-chart">
        <h2>${this.properties.title}</h2>
        <svg viewBox="0 0 36 36" class="circular-chart blue">
          <path
            class="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            stroke-dasharray="80, 100"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" class="percentage">80%</text>
        </svg>
      </div>
    </div>

    <div class="${ styles.meter }">
       <h1>${this.properties.title}</h1>
       <p>${this.properties.description}</p>
       <div>
        <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
          <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
          <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>
          <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#47c3f0" stroke-width="3" stroke-dasharray="${this.properties.percentage} ${100 -this.properties.percentage}" stroke-dashoffset="25"></circle>
          <text class="donut-number" x="50%" y="50%" text-anchor="middle">${this.properties.percentage}%</text>
        </svg>
       </div>
      </div>
      `;
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('percentage', {
                  label: 'Percentage'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
