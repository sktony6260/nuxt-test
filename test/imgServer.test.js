import test from 'ava'
import { resolve } from 'path'
import imgOptimize from '../imgServer/imgOptimize'
import temp from 'fs-temp';

// input a jpg ,and will be output successfully
test('input a jpg file,and it will be output successfully', async t => {
  const optimize = new imgOptimize();
  const dest = temp.mkdirSync();
  const input = resolve('./test/img/test.jpg');
  const res  = await optimize.toFile(input);
  t.not(res, null);
  t.is(res.optimized.format, 'jpeg');
  t.not(res.optimized.width, null);
  t.not(res.optimized.height, null);
  t.pass();
});
test('input a png file,and it will be output successfully', async t => {
  const optimize = new imgOptimize();
  const dest = temp.mkdirSync();
  const input = resolve('./test/img/test.png');
  const res  = await optimize.toFile(input);
  t.not(res, null);
  t.is(res.optimized.format, 'png');
  t.not(res.optimized.width, null);
  t.not(res.optimized.height, null);
  t.pass();
});
test('input a jpg file,and force format to png', async t => {
  const optimize = new imgOptimize({
    width:150,
    height:150,
    format:'png'
  });
  const dest = temp.mkdirSync();
  const input = resolve('./test/img/test.jpg');
  const res  = await optimize.toFile(input);
  t.not(res, null);
  t.is(res.optimized.format, 'png');
  t.is(res.optimized.width, 150);
  t.is(res.optimized.height, 150);
  t.pass();
});
test('input a png file,and force format to jpg', async t => {
  const optimize = new imgOptimize({
    width:300,
    height:300,
    format:'jpg',
    jpgQuality:10
  });
  const dest = temp.mkdirSync();
  const input = resolve('./test/img/test.png');
  const res  = await optimize.toFile(input);
  t.not(res, null);
  t.is(res.optimized.format, 'jpeg');
  t.is(res.optimized.width, 300);
  t.is(res.optimized.height, 300);
  t.pass();
});