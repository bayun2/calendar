import React from 'react';
import Calendar from '../src/index';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {createStartTouchEventObject, createMoveTouchEventObject} from './eventsHelpers';

test('MonthCalendar is normal render', () => {
  const component = mount(
    <Calendar curTime="2017/3/21" type="month"/>
  );
  const snap = component.html();
  expect(snap).toMatchSnapshot();
});

test('WeekCalendar is normal render', () => {
  const component = mount(
    <Calendar curTime="2017/3/21" type="week"/>
  );
  const snap = component.html();
  expect(snap).toMatchSnapshot();
});

test('MonthCalendar in leapYear at February has 29 days', () => {
  const component = mount(
    <Calendar curTime="2016/1/1" type="month"/>
  );
  const snap = component.find('.panelWrap').at(1).html();
  expect(snap).toContain('<div>29</div>');
});

test('WeekCalendar in leapYear at February has 29 days', () => {
  const component = mount(
    <Calendar curTime="2016/1/28" type="week"/>
  );
  const snap = component.find('.panelWrap').at(1).html();
  expect(snap).toContain('<div>29</div>');
});

test('MonthCalendar swipeleft', () => {
  const component = mount(
    <Calendar curTime="2017/3/26" type="month"/>
  );
  const swipeContainer = component.find('.react-swipe-container').children();
  console.log(swipeContainer.html());
  swipeContainer.simulate('touchstart', createStartTouchEventObject({x: 100, y:130}));
  swipeContainer.simulate('touchmove', createStartTouchEventObject({x: 200, y:130}));
  swipeContainer.simulate('touchend', createStartTouchEventObject({x: 300, y:130}));
  console.log(component.text());
  // expect(snap).toContain('<div>29</div>');
});
