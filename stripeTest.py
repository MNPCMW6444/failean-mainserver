### The best way to start is to use the "Delete all test data" button at https://dashboard.stripe.com/test/developers

### Setup:

import stripe

test = 'sk_test_51NfHVHHYpUsYj9bqZJKAxr3aYO0XPOHIgKu63GDrYlfT7C1AoiR4MGscZBJAoZbGl4iEuLvIn3KVOvMpOe1r2txI008jLPqTZV'

prod = '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'

skip_fields = ['amount_decimal', 'unit_amount_decimal', 'type', 'object', 'created', 'livemode', 'updated',]
ignore_products = []
### Fetch production products and prices

stripe.api_key = prod
prodproducts = ('Product', stripe.Product.list(active=True))
prodprices = ('Price', stripe.Price.list(active=True, expand=['data.tiers']))
stripe.api_key = test

### Define some functions

def clear_stripe_things(thing: tuple) -> None:
  '''
  Clear out test products/prices
  '''
  print('Clearing', thing[0])
  for p in getattr(stripe, thing[0]).list():
    print('Clearing', p.get('id'), '-', p.get('name'))
    if p.get('product') in ignore_products:
      print('Ignoring')
      continue
    if not p.get('active'):
      print('Inactive, skipping')
      continue
    if p.get('livemode'):
      print('LIVE MODE THING! Skipping')
      continue
    try:
      getattr(stripe, thing[0]).modify(p.get('id'), active=False)
    except Exception as e:
      print('Exception modifying for', p)
      print(e)
      pass
    try:
      p.delete()
    except Exception as e:
      print('Exception deleting for', p.get('id'))
      print(e)
      continue


def upload_products() -> None:
  '''
  Copy production products to test, preserving IDs
  '''
  print('Uploading products')
  up = list()
  for p in prodproducts[1].get('data'):
    print('Queueing', p.get('id'), '-', p.get('name'))
    if p.get('product') in ignore_products:
      print('Ignoring')
      continue
    up.append({k:v for k,v in p.items() if k not in skip_fields})
  for p in up:
    try:
      del p['default_price']
      print('Uploading', p.get('id'), '-', p.get('name'))
      print(up)
      stripe.Product.create(**p)
    except Exception as e:
      print('EXCEPTION creating', p)
      print('EXCEPTION:', e)
      continue


def get_by_kv(lis, k, v):
  '''
  Return first element in list where key, value matches k, v in dictionary
  '''
  for e in lis:
    if e.get(k) == v:
      return e


def upload_prices() -> None:
  '''
  Upload prices to Stripe, preserving product ID correspondences
  '''
  skips = skip_fields + ['id','unit_amount_decimal','flat_amount_decimal']
  for p in prodproducts[1]:
    print('Uploading for', p.get('id'), '-', p.get('name'))
    if not p.get('active'):
      print('Inactive product, skipping')
      continue
    # x =	get_by_kv(prodprices[1], 'product', p.get('id'))
    # print(x)
    prod_price = get_by_kv(prodprices[1], 'product', p.get('id'))
    # remove the "flat_amount_decimal" and "unit_amount_decimal" keys from the tiers
    #
    if prod_price and 'tiers' in prod_price:
        for tier in prod_price['tiers']:
          del tier['flat_amount_decimal']
          del tier['unit_amount_decimal']
          tier['up_to'] = 'inf' if tier.get('up_to') == None else tier.get('up_to')
    print('prod_price', prod_price)
    test_price = {k:v for k,v in prod_price.items() if k not in skips}
    print('test_price', test_price)
    try:
      stripe.Price.create(**test_price)
    except Exception as e:
      print('EXCEPTION creating price', p)
      print('EXCEPTION:', e)
      continue


stripe.api_key = test
#clear_stripe_things(prodprices)
#clear_stripe_things(prodproducts)


stripe.api_key=test
upload_products()
upload_prices()