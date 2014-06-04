define(["jquery","js/core/coursera","underscore","backbone","js/models/frontdata","js/lib/util","pages/home/account/recommendedSidebarModule.html","js/collections/topics","i18n!pages/home/account/nls/recommendedSidebarModule","i18n!js/json/nls/universities","js/lib/coursera.ab"],function($,Coursera,_,Backbone,FrontData,util,template,Topics,_t,universities_t,AB){_t=_t.merge(universities_t);var MAX_RECS_TO_DISPLAY=2,MAX_RECS_TO_LOAD=2,RecommendedSidebarModule=Backbone.View.extend({render:function(){var self=this,topicIds=_.map(Coursera.user.get("topics").models,function(enrolledTopic){return enrolledTopic.get("id")}),putTopicsInOrder=function(topics,orderedIds){var topicMap={};return _.each(topics,function(topic){topicMap[topic.get("id")]=topic}),_.map(orderedIds.slice(0,MAX_RECS_TO_DISPLAY),function(id){return topicMap[id]})},upcomingCallback=function(frontData){var topicsUpcoming=frontData.get("upcoming").chain().shuffle().first(MAX_RECS_TO_DISPLAY).value(),orderedIds=_.map(topicsUpcoming,function(topic){return topic.get("id")}),recommendedTopics=putTopicsInOrder(topicsUpcoming,orderedIds);if(self.$el.html(template({_t:_t,recommendedTopics:recommendedTopics,config:Coursera.config})),self.options.loadDefer)self.options.loadDefer.resolve("visible")};if(0===topicIds.length)FrontData.singletonRead().done(upcomingCallback),Coursera.multitracker.push(["course-list.recommended-topics.cold-start","load-upcoming-instead"]);else{var recommendedCallback=function(data){var topics=new Topics(Topics.parse(data)),orderedIds=data.ordered_topic_ids;if(topics.length>0){var recommendedTopics=putTopicsInOrder(topics.models,orderedIds);if(self.$el.html(template({_t:_t,recommendedTopics:recommendedTopics,config:Coursera.config})),self.options.loadDefer)self.options.loadDefer.resolve("visible")}else FrontData.singletonRead().done(upcomingCallback),Coursera.multitracker.push(["course-list.recommended-topics-load.no-recommended-topics",topicIds.join()])},recommendedErrorCallback=function(request){FrontData.singletonRead().done(upcomingCallback),Coursera.multitracker.push(["course-list.recommended-topics-load.error-status",{status:request.statusText,text:request.responseText}])},nLeadingDays=AB.user.getExperiment("upcoming_window_leading2").getChosenVariant(),nTrailingDays=AB.user.getExperiment("upcoming_window_trailing2").getChosenVariant();Topics.similarTopics(topicIds,MAX_RECS_TO_LOAD,!0,"rank100",nLeadingDays,nTrailingDays).done(recommendedCallback).fail(recommendedErrorCallback)}return this}});return RecommendedSidebarModule});