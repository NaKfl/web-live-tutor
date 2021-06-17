import { lazyLoad } from 'utils/loadable';

export const CheckoutPaypal = lazyLoad(
  () => import('./index'),
  module => module.CheckoutPaypal,
);
