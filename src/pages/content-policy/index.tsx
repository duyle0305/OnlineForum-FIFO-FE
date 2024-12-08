import PageBreadcrumbs from '@/components/core/page-breadcrumbs'
import { Card, Divider, Flex, Typography } from 'antd'
import React from 'react'

const ContentPolicyPage = () => {
  return (
      <Card>
          <PageBreadcrumbs />

          <Divider />

          <Flex vertical gap={10}>
              <Typography.Title level={2}>FIFO Content Policy</Typography.Title>

              <Typography.Paragraph>
                  Reddit is a vast network of communities that are created, run, and populated by you, the Reddit users.
                  Through these communities, you can post, comment, vote, discuss, learn, debate, support, and connect
                  with people who share your interests, and we encourage you to find—or even create—your home on Reddit.
              </Typography.Paragraph>

              <Typography.Paragraph>
                  While not every community may be for you (and you may find some unrelatable or even offensive), no
                  community should be used as a weapon. Communities should create a sense of belonging for their
                  members, not try to diminish it for others. Likewise, everyone on Reddit should have an expectation of
                  privacy and safety, so please respect the privacy and safety of others.
              </Typography.Paragraph>

              <Typography.Paragraph>
                  Every community on Reddit is defined by its users. Some of these users help manage the community as
                  moderators. The culture of each community is shaped explicitly, by the community rules enforced by
                  moderators, and implicitly, by the upvotes, downvotes, and discussions of its community members.
                  Please abide by the rules of communities in which you participate and do not interfere with those in
                  which you are not a member.
              </Typography.Paragraph>

              <Typography.Paragraph>
                  Below the rules governing each community are the platform-wide rules that apply to everyone on Reddit.
                  These rules are enforced by us, the admins.
              </Typography.Paragraph>

              <Typography.Paragraph>
                  Reddit and its communities are only what we make of them together, and can only exist if we operate by
                  a shared set of rules. We ask that you abide by not just the letter of these rules, but the spirit as
                  well.
              </Typography.Paragraph>
          </Flex>

          <Divider />

          <Flex vertical gap={20}>
              <Typography.Title level={2}>Rules</Typography.Title>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 1</Typography.Title>
                  <Typography.Paragraph>
                      Remember the human. Reddit is a place for creating community and belonging, not for attacking
                      marginalized or vulnerable groups of people. Everyone has a right to use Reddit free of 
                      <u>harassment</u>, <u>bullying</u>, and threats of <u>violence</u>. Communities and users that
                      incite violence or that promote hate based on <u>identity or vulnerability</u> will be banned.
                  </Typography.Paragraph>
              </Flex>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 2</Typography.Title>
                  <Typography.Paragraph>
                      Abide by community rules. Post authentic content into communities where you have a personal
                      interest, and do not cheat or engage in content manipulation (including <u>spamming</u>, 
                      <u>vote manipulation</u>, ban evasion, or subscriber fraud) or otherwise interfere with or disrupt
                      Reddit communities.
                  </Typography.Paragraph>
              </Flex>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 3</Typography.Title>
                  <Typography.Paragraph>
                      Respect the privacy of others. Instigating harassment, for example by revealing someone’s 
                      <u>personal or confidential information</u>, is not allowed. Never post or threaten to post 
                      <u>intimate or sexually-explicit media</u> of someone without their consent.
                  </Typography.Paragraph>
              </Flex>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 4</Typography.Title>
                  <Typography.Paragraph>
                      Do not share or encourage the sharing of <u>sexual</u>, <u>abusive</u>, or suggestive content
                      involving minors. Any predatory or inappropriate behavior involving a minor is also strictly
                      prohibited.
                  </Typography.Paragraph>
              </Flex>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 5</Typography.Title>
                  <Typography.Paragraph>
                      You don’t have to use your real name to use Reddit, but don’t <u>impersonate</u> an individual or
                      an entity in a misleading or deceptive manner.
                  </Typography.Paragraph>
              </Flex>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 6</Typography.Title>
                  <Typography.Paragraph>
                      Ensure people have predictable experiences on Reddit by properly labeling content and communities,
                      particularly content that is graphic, sexually-explicit, or offensive.
                  </Typography.Paragraph>
              </Flex>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 7</Typography.Title>
                  <Typography.Paragraph>
                      Keep it legal, and avoid posting illegal content or soliciting or facilitating 
                      <u>illegal or prohibited transactions</u>.
                  </Typography.Paragraph>
              </Flex>

              <Flex vertical gap={6}>
                  <Typography.Title level={4}>Rule 8</Typography.Title>
                  <Typography.Paragraph>
                      Don’t <u>break the site</u> or do anything that interferes with normal use of Reddit.
                  </Typography.Paragraph>
              </Flex>
          </Flex>
      </Card>
  );
}

export default ContentPolicyPage