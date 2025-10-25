import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, Create, SimpleForm, TextInput, NumberInput } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

const ProductCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="اسم المنتج" />
      <NumberInput source="price" label="السعر (د.ج)" />
      <TextInput source="imageUrl" label="رابط الصورة" />
      <TextInput source="description" label="الوصف" multiline />
    </SimpleForm>
  </Create>
);

const App = () => (
  <Admin dataProvider={restProvider('http://localhost:5000/api/v1')}>
    <Resource name="products" list={ListGuesser} edit={EditGuesser} create={ProductCreate} />
  </Admin>
);

export default App;
