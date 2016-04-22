from django.http import JsonResponse


class JSONResponseMixin(object):
    '''
    Render a JSON response
    Based on the example at https://docs.djangoproject.com/es/1.9/topics/class-based-views/mixins/#more-than-just-html
    '''
    def render_to_json_response(self, context, **response_kwargs):
        '''
        Returns a JSON response, transforming 'context' to make the payload
        '''
        return JsonResponse(
            self.get_data(context),
            safe=False,
            **response_kwargs
        )

    def get_data(self, context):
        '''
        Returns an object that will be serialised as JSON by json.dumps()
        '''
        return context
