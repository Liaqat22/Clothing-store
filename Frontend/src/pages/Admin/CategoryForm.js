import React from 'react'
import { Button,  Form, Input } from 'antd';

function CategoryForm({value , setValue , handleform}) {
  return (
    <div>
          <Form
              onFinish={handleform}>
              <Form.Item >
                  <Input type="text" onChange={(e) => setValue(e.target.value)} value={value} />
              </Form.Item>
              <Form.Item
              >
                  <Button type="primary" htmlType="submit">
                    <b>Save</b>  
                  </Button>
              </Form.Item>
          </Form>
    </div>
  )
}

export default CategoryForm
